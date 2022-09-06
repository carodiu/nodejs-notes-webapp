const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

import { getConnection, sql, queries } from '../database';

import helpers from '../lib/helpers';

passport.use('local.signin',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password', 
    passReqToCallback:true
}, async(req,username,password,done)=>{
    try {
        const pool = await getConnection();
        
        const result = await pool.request()
            .input("username", sql.VarChar, username)
            .query(queries.userGetByUsername);
       
        if (result.recordset.length>0) {
            const user =result.recordset[0];
            const isValid = await helpers.comparePassword(password,user.password);
      
            if (isValid)
                done(null, user, req.flash('success','Welcome '+ user.fullname));
            else
                done(null, false, req.flash('message','Incorrect password'));
        }else{
            return done(null, false, req.flash('message','The user does not exist.'));
        }     
              
    } catch (error) {
        console.log(error);
        
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req,username,password,done)=>{
    const {fullname} = req.body;
    const newUser= {
        username,
        password,
        fullname
    };
    newUser.password= await helpers.encryptPassword(password);
 
    try {
        const pool = await getConnection();
        
        const result = await pool.request()
            .input("username", sql.VarChar, newUser.username)
            .input("password", sql.VarChar, newUser.password)
            .input("fullname", sql.VarChar, newUser.fullname)
            .query(queries.userInsert);
           
        newUser.id = result.recordset[0].id;
   
        return done(null, newUser);
              
    } catch (error) {
        console.log(error);
        
    }

}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    try {
        const pool = await getConnection();
        
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query(queries.userGetById);
    
        return done(null, result.recordset[0]);
              
    } catch (error) {
        console.log(error);
        
    }
});
