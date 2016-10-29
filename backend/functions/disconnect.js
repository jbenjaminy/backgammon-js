const Game = require('../models');

/* FIND GAME BY OBJECT ID AND UPDATE, REMOVING SOCKET, OR DELETE */
let disconnect = (gameId, socketId) => {
    return new Promise((resolve, reject) => {
        const promise = findGame(gameId, socketId);
        promise.then((data) => {
            let game = data.game[0];
            if (data.deleteGame) {
                Game.findByIdAndRemove({ _id: gameId }, (err, gameUpdate) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(console.log(`Game deleted: ${gameId}`));
                });
            } else {
                Game.findOneAndUpdate({ _id: gameId }, {
                    players: game.players,
                    sockets: data.sockets,
                    curPos: game.curPos,
                    returnPos: game.returnPos,
                    dice: game.dice,
                    validMoves: game.validMoves,
                    availableMoves: game.availableMoves,       
                    diceUsed: game.diceUsed,
                    lastRoll: game.lastRoll,    
                    inGame: game.inGame,       
                    isRolling: game.isRolling,       
                    turn: game.turn,       
                    message: game.message,
                    winner: game.winner,   
                    numPlayers: 1,       
                    highlight: game.highlight,       
                    validOne: game.validOne,       
                    validTwo: game.validTwo      
                }, { new: true }, (err, gameUpdate) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(console.log(`Socket disconnected: ${socketId}`));
                });
            }
        });
    });
};

/* FIND GAME BY OBJECT ID AS PROMISE AND REMOVE DISCONNECTED SOCKET */
let findGame = (gameId, socketId) => {
    let deleteGame = true;
    return new Promise((resolve, reject) => {
        Game.find({ _id: gameId}, (err, game) => {
            if (err) {
                reject(err);
            }
            if (!game.length) {
                reject(err);
            }
            let sockets = game[0].sockets;
            if (sockets.white) {
                if (sockets.white === socketId) {
                    sockets.white = null;
                } else {
                    deleteGame = false;
                }
            } 
            if (sockets.black) {
                if (sockets.black === socketId) {
                    sockets.black = null;
                } else {
                    deleteGame = false;
                }
            }
            resolve({game: game, sockets: sockets, deleteGame: deleteGame});
        });
    });
};

module.exports = disconnect;