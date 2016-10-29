const Game = require('../models');

/* FIND GAME BY OBJECT ID */
let resumeGame = (data, socket) => {
    return new Promise((resolve, reject) => {
        const promise = findGame(data, socket);
        promise.then((data2) => {
            let game = data2.game[0];
            Game.findOneAndUpdate({ _id: data.id }, {
                players: game.players,
                sockets: data2.sockets,      
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
                numPlayers: 2,
                highlight: game.highlight,       
                validOne: game.validOne,       
                validTwo: game.validTwo      
            }, { new: true }, (err, gameUpdate) => {
                if (err) {
                  reject(err);
                }
                resolve({game: gameUpdate, socket: socket, addSocket: true});
            });
        });
    });
}

/* FIND GAME BY OBJECT ID AS PROMISE */
let findGame = (data, socket) => {
	let id = data.id;
    let name = data.name;
    let reject = true;
    return new Promise((resolve, reject) => {
        Game.find({ _id: id}, (err, game) => {
            if (err) {
                reject(err);
            }
            if (!game.length) {
                reject(console.log(`No data could be found for game: ${id}`));
            }
            let players = game[0].players;
            let sockets = game[0].sockets;
            if (name === players.white && !sockets.white) {
                sockets.white = socket.id;
                reject = false;
            } else if (name === players.black && !sockets.black) {
                sockets.black = socket.id;
                reject = false;
            }
            if (reject) {
                reject(console.log(`Either the game is full or the supplied name could not be matched with the supplied game ID (${game._id}). Please check inputs and try again.`))
            }
            resolve({game: game, sockets: sockets});
        });
    });
}

module.exports = resumeGame;