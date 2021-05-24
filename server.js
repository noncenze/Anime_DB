require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const methodOverride = require('method-override');
const db = require('./models');
const { default: axios } = require('axios');

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

// MAIN PAGE
app.get('/', (req, res) => {
  const animeURL = `https://kitsu.io/api/edge/trending/anime?page[limit]=12`;
  axios.get(animeURL).then(response => {
    let data = response.data.data;
    res.render('index', {trendingAnimes: data})
  })
})


// ====================================================
//                     PROFILE ROUTE
// ====================================================

// DISPLAY USER PROFILE
app.get('/profile', isLoggedIn, (req, res) => {
  const {id, name, email} = req.user.get();
  res.render('profile', {id, name, email});
});

// DISPLAYS USER EDIT PAGE
app.get('/edit/:id', isLoggedIn, (req, res) => {
  const {id, name, email} = req.user.get();
  res.render('edit', {id, name, email});
})

// EDIT USER ACCOUNT
app.put('/edit/:id', isLoggedIn, (req, res) => {
  db.user.findOne({where: {
    name: req.user.name,
    email: req.user.email,
  }}).then(userAccount => {
    userAccount.update({
      name: req.body.userName,
      email: req.body.userEmail,
    }).then(() => {
      res.redirect('/profile');
    })
  }).catch(error => {
    console.log(error);
  })
})

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