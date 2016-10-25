const Game = require('../models');

/* FIND GAME BY OBJECT ID */
let resumeGame = (data, socket) => {
    return new Promise((resolve, reject) => {
        const promise = findGame(data, socket);
        promise.then((game) => {
            Game.findOneAndUpdate({ _id: id }, {
                players: players,
                sockets:       
                curPos: game[0].curPos,
                returnPos: game[0].returnPos,
                dice: game[0].dice,
                validMoves: game[0].validMoves,
                availableMoves: game[0].availableMoves,       
                diceUsed: game[0].diceUsed,      
                inGame: game[0].inGame,       
                isRolling: game[0].isRolling,       
                turn: game[0].turn,       
                message: game[0].message,       
                lastRoll: game[0].lastRoll,       
                highlight: game[0].highlight,       
                validOne: game[0].validOne,       
                validTwo: game[0].validTwo,       
                winner: game[0].winner
            }, { new: true }, (err, game) => {
                if (err) {
                  reject(err);
                }
                resolve(game);
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
                reject(err);
            }
            let players = game[0].players;
            let sockets = game[0].sockets;
            if (name === players.white && !sockets.white) {
            	console.log()
            }
            resolve(game);
        });
    });
}

module.exports = resumeGame;