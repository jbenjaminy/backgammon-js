const Game = require('../models');

/* UNDO MOVES BY OBJECT ID, REVERTING STATE AND POSITIONS TO THE START OF THE TURN */
let undoMoves = (data, socket) => {
    data = data.state;
    let id = data.gameId;
    return new Promise((resolve, reject) => {
        Game.findOneAndUpdate({ _id: id }, {
            players: data.players,
            sockets: data.sockets,
            curPos: data.returnPos,  
            returnPos: data.returnPos,
            dice: data.dice,
            validMoves: [],
            availableMoves: data.dice,       
            diceUsed: [],
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
            resolve({game: game, socket: socket, addSocket: false});
        });
    });
}

module.exports = undoMoves;