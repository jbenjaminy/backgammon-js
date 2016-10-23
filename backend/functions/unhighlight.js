const Game = require('../models');

/* UNHILIGHTS POSITIONS FOR BOTH 'SELECTED' SPACES & 'VALID MOVES' */
let unhighlight = (data) => {
    let id = data.gameId;
    return new Promise((resolve, reject) => {
        Game.findOneAndUpdate({ _id: id }, {
            players: data.players,      
            curPos: data.curPos,
            returnPos: data.returnPos,
            dice: data.dice,
            validMoves: data.validMoves,
            availableMoves: data.availableMoves,       
            diceUsed: data.diceUsed,       
            inGame: data.inGame,       
            isRolling: data.isRolling,       
            turn: data.turn,       
            message: data.message,       
            lastRoll: data.lastRoll,       
            highlight: null,       
            validOne: null,       
            validTwo: null,       
            winner: data.winner    
        }, { new: true }, (err, game) => {
            if (err) {
                reject(err);
            }
            resolve(game);
        });
    });
}

module.exports = unhighlight;