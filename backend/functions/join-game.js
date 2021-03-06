const Game = require('../models');

/* JOIN GAME BY OBJECT ID */
let joinGame = (data, socket) => {
    let id = data.id;
    let playerTwo = data.playerTwo;
    return new Promise((resolve, reject) => {
        const promise = findGame(id);
        promise.then((game) => {
            let players = game[0].players;
            let sockets = game[0].sockets;
            if (!sockets.black) {
                players.black = playerTwo;
                sockets = { 'white': sockets.white, 'black': socket.id };
            } else {
                reject(console.log(`Game ${id} is full`));
            }
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
let findGame = (id) => {
    return new Promise((resolve, reject) => {
        Game.find({ _id: id}, (err, game) => {
            if (err) {
                reject(err);
            }
            if (!game.length) {
                reject(console.log(`No data could be found for game: ${id}`));
            }
            resolve(game);
        });
    });
}

module.exports = joinGame;