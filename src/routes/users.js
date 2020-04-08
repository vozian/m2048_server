var express = require('express');
var router = express.Router();
const UserModel = require("../models/user.model");

router.post('/login', async (req, res, next) => {
    let users = await UserModel.find({"username": req.body.username});
    if(users.length === 0 || users[0].password !== req.body.password) {
        res.status(400)
        res.send()
    } else {
        res.send(users[0]);
    }
});

router.post('/register', async (req, res, next) => {
    let users = await UserModel.find({"username": req.body.username});
    if(users.length !== 0){
        res.status(400)
        res.send()
    } else {
        let user = await (new UserModel(req.body)).save();
        res.send(user);
    }
});

module.exports = router;
