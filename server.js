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

socketsObj = {};

let emit = (game) => {
    if (game.sockets.white) {
        game.sockets.white.emit('action', {
            type:'update', 
            data: game
        });
    }
    if (game.sockets.black) {
        game.sockets.black.emit('action', {
            type: 'update',
            data: game
        });
    }
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
        if (state.numPlayers === 1 || state.sockets[state.turn].id === socket.id) {
            if (action.type === 'server/createGame') {
                createGame(action.data, socket).then((game) => {
                    // store key/value socket.id/gameId to enable lookup of the game a socket is in, to remove on disconnect
                    socketsObj[socket.id] = game._id;
                    emit(game);
                });
            }
            if (action.type === 'server/joinGame') {
                joinGame(action.data, socket).then((game) => {
                    socketsObj[socket.id] = game._id;
                    emit(game);
                });
            }
            if (action.type === 'server/resumeGame') {
                resumeGame(action.data, socket).then((game) => {
                    socketsObj[socket.id] = game._id;
                    emit(game);
                });
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
            if (action.type === 'server/undoMoves') {
                undoMoves(action.data).then(emit);
            }
            if (action.type === 'server/endTurn') {
                endTurn(action.data).then(emit);
            }
        } else {
            console.log('Cannot move for another player.');
        }
    });
    socket.on('disconnect', () => {
        let gameId = socketsObj[socket.id];
        disconnect(gameId, socket.id);
        console.log(`Socket disconnected: ${socket.id}`);
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