import express from 'express';
import passport from 'passport';

const router = express.Router();
import { isLoggedIn, isNotLoggedIn } from '../lib/auth.js';
import { notes } from '../controllers/notes.controller';
 
router.get('/login',isNotLoggedIn, (req,res)=>{
    res.render('auth/login');
});

router.post('/login',isNotLoggedIn, (req,res,next)=>{
   passport.authenticate('local.signin',{
    successRedirect:'/profile',
    failureRedirect:'/login',
    failureFlash:true
   })(req,res,next);
});

router.get('/signup', isNotLoggedIn, (req,res)=>{
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup',{
        successRedirect:'/profile',
        failureRedirect:'/signup',
        failureFlash:true   
}));

router.get('/profile', isLoggedIn, async (req,res)=>{
    const userId = req.user.id; 
    const quantity = await notes.count(userId); 
 
    res.render('profile', {'quantity':quantity});
});

router.get('/logout',isLoggedIn, (req,res)=>{
    req.logOut(req.user, err => {
        if(err) return next(err);
        res.redirect('/login');
      });
  
});

module.exports= router;