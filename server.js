const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const config = require('./backend/config');

const createGame = require('./backend/functions/create-game');
const joinGame = require('./backend/functions/join-game');
const resumeGame = require('./backend/functions/resume-game');
const restartGame = require('./backend/functions/restart-game');
const rollDice = require('./backend/functions/roll-dice');
const makeRoll = require('./backend/functions/make-roll');
const findValidMoves = require('./backend/functions/find-valid-moves');
const updatePositions = require('./backend/functions/update-positions');
const unhighlight = require('./backend/functions/unhighlight');
const undoMoves = require('./backend/functions/undo-moves');
const endTurn = require('./backend/functions/end-turn');
const disconnect = require('./backend/functions/disconnect');

app.use(express.static('./build'));

gameIdsObj = {};
socketsObj = {};

let emit = (data) => {
    // console.log(data.game, data.socket.id, data.addSocket);
    if (data.addSocket) {
        gameIdsObj[data.socket.id] = data.game._id;
        if (socketsObj[data.game._id]) {
            socketsObj[data.game._id].push(data.socket);
        } else {
            socketsObj[data.game._id] = [data.socket];
        }
        // console.log('gameIdsObj --->', gameIdsObj);
        // console.log('socketsObj --->', socketsObj);
    }
    socketsObj[data.game._id].forEach((client) => {
        client.emit('action', {
            type:'update', 
            data: data.game
        });
    });
};

// ACTIONS
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    // socket.emit('action', {
    //     type: 'routeHome'
    // });
    socket.on('action', (action) => {
        // console.log('action---->', action)
        let state = action.data.state;
        if (state.numPlayers < 2 || state.sockets[state.turn] === socket.id) {
            if (action.type === 'server/createGame') {
                createGame(action.data, socket).then(emit);
            }
            if (action.type === 'server/joinGame') {
                joinGame(action.data, socket).then(emit);
            }
            if (action.type === 'server/resumeGame') {
                resumeGame(action.data, socket).then(emit);
            }
            if (action.type === 'server/restartGame') {
                restartGame(action.data, socket).then(emit);
            }
            if (action.type === 'server/rollDice') {
                rollDice(action.data, socket).then(emit);
            }
            if (action.type === 'server/makeRoll') {
                makeRoll(action.data, socket).then(emit);
            }
            if (action.type === 'server/findValidMoves') {
                findValidMoves(action.data, socket).then(emit);
            }
            if (action.type === 'server/updatePositions') {
                updatePositions(action.data, socket).then(emit);
            }
            if (action.type === 'server/unhighlight') {
                unhighlight(action.data, socket).then(emit);
            }
            if (action.type === 'server/undoMoves') {
                undoMoves(action.data, socket).then(emit);
            }
            if (action.type === 'server/endTurn') {
                endTurn(action.data, socket).then(emit);
            }
        } else {
            console.log('Cannot move for another player.');
        }
    });
    socket.on('disconnect', () => {
        let gameId = gameIdsObj[socket.id];
        if (gameId) {
            disconnect(gameId, socket.id);
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