const Game = require('../models');

/* JOIN GAME BY OBJECT ID */
let joinGame = (data) => {
    let id = data.id;
    let playerTwo = data.playerTwo;
    return new Promise((resolve, reject) => {
        const promise = findGame(id);
        promise.then((game) => {
            let players = game[0].players;
            players.black = playerTwo;
            Game.findOneAndUpdate({ _id: id }, {
                players: players,      
                curPos: game[0].curPos,
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
let findGame = (id) => {
    return new Promise((resolve, reject) => {
        Game.find({ _id: id}, (err, game) => {
            if (err) {
                reject(err);
            }
            if (!game.length) {
                reject(err);
            }
            resolve(game);
        });
    });
}

module.exports = joinGame;