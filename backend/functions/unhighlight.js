const Game = require('../models');

/* UNHILIGHTS POSITIONS FOR BOTH 'SELECTED' SPACES & 'VALID MOVES' */
let unhighlight = (data) => {
    data = data.state,
    let id = data.gameId;
    return new Promise((resolve, reject) => {
        Game.findOneAndUpdate({ _id: id }, {
            players: data.players,
            sockets: data.sockets,     
            curPos: data.curPos,
            returnPos: data.returnPos,
            dice: data.dice,
            validMoves: data.validMoves,
            availableMoves: data.availableMoves,       
            diceUsed: data.diceUsed,
            lastRoll: data.lastRoll,       
            inGame: data.inGame,       
            isRolling: data.isRolling,       
            turn: data.turn,       
            message: data.message,       
            winner: data.winner,    
            numPlayers: data.numPlayers,       
            highlight: null,       
            validOne: null,       
            validTwo: null       
        }, { new: true }, (err, game) => {
            if (err) {
                reject(err);
            }
            resolve(game);
        });
    });
}

module.exports = unhighlight;