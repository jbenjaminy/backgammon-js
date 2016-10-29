const Game = require('../models');

/* SWITCHES DICE ARRAY BRIEFLY TO GIF SRCS FOR 'ROLLING' ANIMATION */
let rollDice = (data, socket) => {
    data = data.state;
    let id = data.gameId;
    let dice = ['../img/dice-roll-one.gif'];
    if (data.inGame) {
        dice = ['../img/dice-roll-one.gif', '../img/dice-roll-two.gif'];
    }
    return new Promise((resolve, reject) => {
        Game.findOneAndUpdate({ _id: id }, {
            players: data.players,
            sockets: data.sockets,   
            curPos: data.curPos,
            returnPos: data.returnPos,
            dice: dice,
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
            highlight: data.highlight,       
            validOne: data.validOne,       
            validTwo: data.validTwo      
        }, { new: true }, (err, game) => {
            if (err) {
                reject(err);
            }
            resolve({game: game, socket: socket, addSocket: false});
        });
    });
}

module.exports = rollDice;
