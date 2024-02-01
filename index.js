const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //allow access from any client  !!! change this to allowed domain names / origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); //allow these methods
    next();
});

//test route
app.get('/', (req, res, next) => {
    res.send('Hello World!');
});

//CRUD Routes
app.use('/users', require('./routes/users'));

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