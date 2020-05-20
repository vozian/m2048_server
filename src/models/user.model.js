const mongoose = require('mongoose');

const StatisticsSchema = mongoose.Schema({
    bestMultiPlayerScore: Number,
    bestSinglePlayerScore: Number,
    gamesPlayed: Number,
    gamesWon: Number,
});

const UserSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    statistics: StatisticsSchema,
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema, 'users');