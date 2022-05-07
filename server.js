require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);
const port = process.env.PORT || 5500;

// Database connection
const url = 'mongodb://127.0.0.1:27017/mr-burger';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection
    .once('open', function () {
        console.log('mongoDB connection successful');
    })
    .on('error', function (err) {
        console.log(err);
        console.log('mongoDB connection fail')
    });

// session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    connection: "sessions"
});

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));
app.use(flash());


// Assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Set templete engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Web routes
require('./routes/web')(app);


// Connect server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});