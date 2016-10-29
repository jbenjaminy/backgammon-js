const Game = require('../models');

/* FIND GAME BY OBJECT ID */
let resumeGame = (data, socket) => {
    return new Promise((resolve, reject) => {
        const promise = findGame(data, socket);
        promise.then((game, sockets) => {
            Game.findOneAndUpdate({ _id: id }, {
                players: players,
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
                numPlayers: 2,
                highlight: game[0].highlight,       
                validOne: game[0].validOne,       
                validTwo: game[0].validTwo      
            }, { new: true }, (err, game) => {
                if (err) {
                  reject(err);
                }
                resolve({game: game, socket: socket, addSocket: true});
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
                sockets.white = socket;
                reject = false;
            } else if (name === players.black && !sockets.black) {
                sockets.black = socket;
                reject = false;
            }
            if (reject) {
                reject(console.log(`Either the game is full or the supplied name could not be matched with the supplied game ID (${game._id}). Please check inputs and try again.`))
            }
            resolve(game, sockets);
        });
    });
}

module.exports = resumeGame;