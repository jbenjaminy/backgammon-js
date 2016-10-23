const Game = require('../models');

/* UNDO MOVES BY OBJECT ID, REVERTING STATE AND POSITIONS TO THE START OF THE TURN */
let undoMoves = (data) => {
    let id = data.gameId;
    return new Promise((resolve, reject) => {
        Game.findOneAndUpdate({ _id: id }, {
            players: data.players,
            curPos: data.returnPos,  
            returnPos: data.returnPos,
            dice: data.dice,
            validMoves: [],
            availableMoves: data.dice,       
            diceUsed: [],       
            inGame: data.inGame,       
            isRolling: data.isRolling,       
            turn: data.turn,       
            message: data.message,       
            lastRoll: data.lastRoll,       
            highlight: null,       
            validOne: null,       
            validTwo: null,       
            winner: null    
        }, { new: true }, (err, game) => {
            if (err) {
                reject(err);
            }
            resolve(game);
        });
    });
}

module.exports = undoMoves;