const mongoose = require('mongoose');

function init() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://185.181.10.130:27017/game', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

module.exports = {init};
