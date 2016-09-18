const Game = require('../models');

/* END TURN AND UPDATE GAME */
let endTurn = (data) => {
    let id = data.gameId;
    let message = '\'S ROLL';
    let turn = data.turn;
    turn = turn === 'white' ? 'black' : 'white';
    return new Promise((resolve, reject) => {
        Game.findOneAndUpdate({ _id: id }, {
            players: data.players,      
            curPos: data.curPos,
            dice: data.dice,
            validMoves: [],
            availableMoves: [],       
            diceUsed: [],       
            inGame: data.inGame,       
            isRolling: true,       
            turn: turn,       
            message: message,       
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

module.exports = endTurn;