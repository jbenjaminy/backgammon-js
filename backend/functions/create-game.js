const Game = require('../models');

/* CREATE NEW GAME */
let newGame = (data, socket) => {
    let playerOne = data.playerOne;
    return new Promise((resolve, reject) => {
        Game.create({
            players: {'white': playerOne, 'black': 'PLAYER TWO'},
            sockets: {'white': socket.id, 'black': null},     
            curPos: {1: {'white': 0, 'black': 0}, 2: {'white': 0, 'black': 2}, 3: {'white': 0, 'black': 0}, 4: {'white': 0, 'black': 0}, 5: {'white': 0, 'black': 0}, 6: {'white': 0, 'black': 0}, 7: {'white': 5, 'black': 0}, 8: {'white': 0, 'black': 0}, 9: {'white': 0, 'black': 0}, 10: {'white': 3, 'black': 0}, 11: {'white': 0, 'black': 0}, 12: {'white': 0, 'black': 0}, 13: {'white': 0, 'black': 0}, 14: {'white': 0, 'black': 5}, 15: {'white': 5, 'black': 0}, 16: {'white': 0, 'black': 0}, 17: {'white': 0, 'black': 0}, 18: {'white': 0, 'black': 0}, 19: {'white': 0, 'black': 3}, 20: {'white': 0, 'black': 0}, 21: {'white': 0, 'black': 0}, 22: {'white': 0, 'black': 5}, 23: {'white': 0, 'black': 0}, 24: {'white': 0, 'black': 0}, 25: {'white': 0, 'black': 0}, 26: {'white': 0, 'black': 0}, 27: {'white': 2, 'black': 0}, 28: {'white': 0, 'black': 0}},
            // curPos: {1: {'white': 0, 'black': 0}, 2: {'white': 0, 'black': 0}, 3: {'white': 0, 'black': 0}, 4: {'white': 0, 'black': 0}, 5: {'white': 0, 'black': 0}, 6: {'white': 0, 'black': 0}, 7: {'white': 5, 'black': 0}, 8: {'white': 0, 'black': 0}, 9: {'white': 0, 'black': 0}, 10: {'white': 3, 'black': 0}, 11: {'white': 0, 'black': 0}, 12: {'white': 0, 'black': 0}, 13: {'white': 0, 'black': 0}, 14: {'white': 0, 'black': 0}, 15: {'white': 5, 'black': 0}, 16: {'white': 0, 'black': 0}, 17: {'white': 0, 'black': 0}, 18: {'white': 0, 'black': 0}, 19: {'white': 0, 'black': 0}, 20: {'white': 2, 'black': 0}, 21: {'white': 0, 'black': 0}, 22: {'white': 0, 'black': 5}, 23: {'white': 0, 'black': 2}, 24: {'white': 0, 'black': 2}, 25: {'white': 0, 'black': 2}, 26: {'white': 0, 'black': 2}, 27: {'white': 0, 'black': 2}, 28: {'white': 0, 'black': 0}},
            returnPos: null,
            dice: [1],
            validMoves: [],
            availableMoves: [],       
            diceUsed: [],
            lastRoll: [],       
            inGame: false,       
            isRolling: true,       
            turn: 'white',       
            message: ': ROLL FOR FIRST TURN',
            winner: '',
            numPlayers: 1, 
            highlight: null,       
            validOne: null,       
            validTwo: null       
        }, (err, game) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve({game: game, socket: socket, addSocket: true});
        });
    });
}

module.exports = newGame;