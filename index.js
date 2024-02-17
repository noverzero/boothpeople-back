const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user');

const app = express();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //allow access from any client  !!! change this to allowed domain names / origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); //allow these methods
    next();
});

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Hello World!!' : 'Logged out');
});

//CRUD Routes
app.use('/users', require('./routes/users'));
const { requiresAuth } = require('express-openid-connect');

//protected route example
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

//error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500; //if no status code set, set to 500
    const message = error.message;
    res.status(status).json({ message: message });
});

//sync sequelize models to database, then start server
sequelize
    .sync()
    .then(result => {
        console.log(`Database Connection Established`);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app; //export app for testing