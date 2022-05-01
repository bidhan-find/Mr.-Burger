require('dotenv');
const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const app = express();
const port = process.env.PORT || 5500;




// Assets
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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