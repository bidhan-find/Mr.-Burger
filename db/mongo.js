const mongoose = require('mongoose');

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