const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const config = require('./backend/config');

const createGame = require('./backend/functions/create-game');
const joinGame = require('./backend/functions/join-game');
const findGame = require('./backend/functions/find-game');
const restartGame = require('./backend/functions/restart-game');
const rollDice = require('./backend/functions/roll-dice');
const makeRoll = require('./backend/functions/make-roll');
const findValidMoves = require('./backend/functions/find-valid-moves');
const updatePositions = require('./backend/functions/update-positions');
const unhighlight = require('./backend/functions/unhighlight');
const endTurn = require('./backend/functions/end-turn');

const sockets = [];

app.use(express.static('./build'));

let emit = (game) => {
    for (let socket of sockets) {
        socket.emit('action', {
            type:'update', 
            data: game
        });
    }
};

// ACTIONS
io.on('connection', (socket) => {
    console.log("Socket connected: " + socket.id);
    sockets.push(socket);
    socket.on('action', (action) => {
        console.log('action---->', action)
        if (action.type === 'server/createGame') {
            createGame(action.data).then(emit);
        }
        if (action.type === 'server/joinGame') {
            joinGame(action.data).then(emit);
        }
        if (action.type === 'server/findGame') {
            findGame(action.data).then(emit);
        }
        if (action.type === 'server/restartGame') {
            restartGame(action.data).then(emit);
        }
        if (action.type === 'server/rollDice') {
            rollDice(action.data).then(emit);
        }
        if (action.type === 'server/makeRoll') {
            makeRoll(action.data).then(emit);
        }
        if (action.type === 'server/findValidMoves') {
            findValidMoves(action.data).then(emit);
        }
        if (action.type === 'server/updatePositions') {
            updatePositions(action.data).then(emit);
        }
        if (action.type === 'server/unhighlight') {
            unhighlight(action.data).then(emit);
        }
        if (action.type === 'server/endTurn') {
            endTurn(action.data).then(emit);
        }
    });
});

// RUN SERVER FUNCTION
function runServer(callback) {
    mongoose.connect(config.DATABASE_URL, (err) => {
        if (err && callback) {
            return callback(err);
        }

        server.listen(config.PORT, () => {
            console.log(`Listening on localhost: ${config.PORT}`);
            if (callback) {
                callback();
            }
        });
    });
}

if (require.main === module) {
    runServer((err) => {
        if (err) {
            throw new Error(err);
        }
    });
}