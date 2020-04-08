const mongoose = require('mongoose');

const StatisticsSchema = mongoose.Schema({
    bestSinglePlayerScore: Number,
    gamesPlayed: Number,
    gamesWon: Number,
});

const UserSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    state: Number,
    roomId: Number,
    statistics: StatisticsSchema,
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema, 'users');