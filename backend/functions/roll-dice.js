const Game = require('../models');

/* SWITCHES DICE ARRAY BRIEFLY TO GIF SRCS FOR 'ROLLING' ANIMATION */
let rollDice = (data) => {
    let id = data.gameId;
    let dice = ['../img/dice-roll-one.gif'];
    if (data.inGame) {
        dice = ['../img/dice-roll-one.gif', '../img/dice-roll-two.gif'];
    }
    return new Promise((resolve, reject) => {
        Game.findOneAndUpdate({ _id: id }, {
            players: data.players,      
            curPos: data.curPos,
            returnPos: data.returnPos,
            dice: dice,
            validMoves: data.validMoves,
            availableMoves: data.availableMoves,       
            diceUsed: data.diceUsed,       
            inGame: data.inGame,       
            isRolling: data.isRolling,       
            turn: data.turn,       
            message: data.message,       
            lastRoll: data.lastRoll,       
            highlight: data.highlight,       
            validOne: data.validOne,       
            validTwo: data.validTwo,       
            winner: data.winner    
        }, { new: true }, (err, game) => {
            if (err) {
                reject(err);
            }
            resolve(game);
        });
    });
}

module.exports = rollDice;
