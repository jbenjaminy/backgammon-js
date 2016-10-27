const Game = require('../models');

/* END TURN AND UPDATE GAME */
let endTurn = (data) => {
    let id = data.state.gameId;
    let message = '\'S ROLL';
    let turn = data.state.turn;
    turn = turn === 'white' ? 'black' : 'white';
    return new Promise((resolve, reject) => {
        Game.findOneAndUpdate({ _id: id }, {
            players: data.state.players,
            sockets: data.state.sockets,
            curPos: data.state.curPos,
            returnPos: null,
            dice: data.state.dice,
            validMoves: [],
            availableMoves: [],       
            diceUsed: [],
            lastRoll: data.state.lastRoll,
            inGame: data.state.inGame,       
            isRolling: true,       
            turn: turn,       
            message: message,       
            winner: data.state.winner,
            numPlayers: data.state.numPlayers,    
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

module.exports = endTurn;