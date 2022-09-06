import express from 'express';
import morgan from 'morgan';
import config from './config';
import { engine } from 'express-handlebars';
import path from 'path';
import flash from 'connect-flash';
import session from 'express-session';
import MSSQLStore from 'connect-mssql-v2';
import { dbSettings, getConnection, sql } from './database';
import passport from 'passport';
//import employeesRoutes from './routes/employees.routes';

//initializations
const app = express();
require('./lib/passport.js');
//settings
app.set('port', config.port );
app.set('views', path.join(__dirname, 'views')); 
app.engine('.hbs', engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//middlewares
var options = {    
    ttl: 3600,
    reapInterval: 3600
};

  app.use(
    session({
      store: new MSSQLStore(dbSettings, options), 
      secret: 'supersecret',
      resave: false,
      saveUninitialized:false
    }));

app.use(flash());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req, res, next)=>{
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message');
    app.locals.user=req.user;
    next();
});

//routes
//app.use(employeesRoutes);
// caching disabled for every route
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/notes',require('./routes/notes.js'));
//Public folders
app.use(express.static(path.join(__dirname, 'public')));

//start server



export default app;