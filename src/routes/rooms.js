const express = require('express');
const shortid = require('shortid');
var router = express.Router();

let rooms = {};
let sockets = {};
let open = undefined;

router.post('/connect', async (req, res, next) => {
    if (rooms[req.body.id]) {
        rooms[req.body.id].players.push(req.body.username);
        if(sockets[req.body.id]){
            sockets[req.body.id].send(rooms[req.body.id])
            res.send(rooms[req.body.id]);
            delete sockets[req.body.id];
        } else {
            sockets[req.body.id] = res;
        }
    } else {
        res.status(400)
        res.send()
    }
});

router.post('/create', async (req, res, next) => {
    let room = {
        id: shortid.generate(),
        players: []
    }
    rooms[room.id] = room;
    res.send(room);
});

router.post('/any', async (req, res, next) => {
    if (open) {
        open.room.players.push(req.body.username)
        open.res.send(open.room);
        res.send(open.room);
        open = undefined;
    } else {
        open = {
            room: {
                id: shortid.generate(),
                players: [req.body.username]
            },
            res: res
        };
    }
});

router.post("/move", async (req, res, next) => {
    let room = req.body;
    rooms[req.body.id] = room;
    if(room.isOver){
        res.send(room);
        sockets[room.id].send(room);
        delete rooms[room.id];
        delete sockets[room.id];
    } else {
        if(sockets[room.id]) sockets[room.id].send(room);
        sockets[room.id] = res;
    }
});

router.post("/wait", async (req, res, next) => {
    if(sockets[req.body.id]){
        res.send(rooms[req.body.id])
    } else {
        sockets[req.body.id] = res;
    }
});

module.exports = router;
