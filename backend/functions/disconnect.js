const Game = require('../models');

/* FIND GAME BY OBJECT ID AND UPDATE, REMOVING SOCKET, OR DELETE */
let disconnect = (gameId, socketId) => {
    return new Promise((resolve, reject) => {
        const promise = findGame(gameId, socketId);
        promise.then((game, sockets, deleteGame) => {
            if (deleteGame) {
                Game.findByIdAndRemove({ gameId }, (err, game) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(game);
                });
            } else {
                Game.findOneAndUpdate({ _id: gameId }, {
                    players: game[0].players,
                    sockets: sockets,
                    curPos: game[0].curPos,
                    returnPos: game[0].returnPos,
                    dice: game[0].dice,
                    validMoves: game[0].validMoves,
                    availableMoves: game[0].availableMoves,       
                    diceUsed: game[0].diceUsed,
                    lastRoll: game[0].lastRoll,    
                    inGame: game[0].inGame,       
                    isRolling: game[0].isRolling,       
                    turn: game[0].turn,       
                    message: game[0].message,
                    winner: game[0].winner,   
                    numPlayers: 1,       
                    highlight: game[0].highlight,       
                    validOne: game[0].validOne,       
                    validTwo: game[0].validTwo      
                }, { new: true }, (err, game) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(game);
                });
            }
        });
    });
};

/* FIND GAME BY OBJECT ID AS PROMISE AND REMOVE DISCONNECTED SOCKET */
let findGame = (gameId, socketId) => {
    console.log('gameId---->', gameId);
    console.log('socketId---->', socketId);
    let deleteGame = true;
    return new Promise((resolve, reject) => {
        Game.find({ _id: gameId}, (err, game) => {
            console.log('game---->', game);
            if (err) {
                reject(err);
            }
            if (!game.length) {
                reject(err);
            }
            let sockets = game.sockets;
            if (sockets.white) {
                if (sockets.white === socketId) {
                    sockets[white] = null;
                } else {
                    deleteGame = false;
                }
            } 
            if (sockets.black) {
                if (sockets.black === socketId) {
                    sockets[black] = null;
                } else {
                    deleteGame = false;
                }
            }
            resolve(game, sockets, deleteGame);
        });
    });
};

module.exports = disconnect;