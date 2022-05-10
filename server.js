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
const passport = require("passport");
const Emitter = require('events');
const port = process.env.PORT || 5500;

// Database connection
const connection = mongoose.connection;
require("./db/mongo");

// session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    connection: "sessions"
});

// Event emitter
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));
app.use(flash());

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


// Assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// Set templete engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Web routes
require('./routes/web')(app);


// Connect server
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

// Socket.io
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    // Join
    socket.on('join', (roomName) => {
        socket.join(roomName);
    });
});

eventEmitter.on("orderUpdated", (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data);
});

eventEmitter.on("orderPlaced", (data) => {
    io.to('adminRoom').emit('orderPlaced', data);
});