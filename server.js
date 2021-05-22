require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const methodOverride = require('method-override');

const SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));

app.use(session({
  secret: SECRET_SESSION,               // What will be given to the user as a session cookie
  resave: false,                        // Don't save the session when it's modified
  saveUninitialized: true               // Save any new session
}))

app.use(passport.initialize());         // Start passport
app.use(passport.session());            // Add a session using passport
app.use(flash());                       // Initialize flash
app.use((req, res, next) => {           // Store flash messages and user on res.locals
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


// ====================================================
//                     INDEX ROUTE
// ====================================================
app.get('/', (req, res) => {
  res.render('index');
});


// ====================================================
//                     PROFILE ROUTE
// ====================================================
app.get('/profile', isLoggedIn, (req, res) => {
  const {id, name, email} = req.user.get();
  res.render('profile', {id, name, email});
});


// ====================================================
//                      CONTROLLERS
// ====================================================
app.use('/auth', require('./controllers/auth'));
app.use('/anime', require('./controllers/anime'));


// ====================================================
//                    NON-VALID ROUTES
// ====================================================
app.get('/*', (req, res) => {
  res.redirect('/');
})


// ====================================================
//                     PORT LISTENER
// ====================================================
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;