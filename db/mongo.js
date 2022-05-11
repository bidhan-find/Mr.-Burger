const mongoose = require('mongoose');

// Database connection
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.l9tcw.mongodb.net/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`;

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
        console.log('mongoDB connection fail');
    });