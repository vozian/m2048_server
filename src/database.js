const mongoose = require('mongoose');

function init() {
    console.log("Trying");
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://admin:Teia50517.@185.181.10.130:27017/admin?authSource=admin&readPreference=primary&ssl=false", {
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
