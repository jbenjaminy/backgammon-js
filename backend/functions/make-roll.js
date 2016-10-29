const Game = require('../models');

/* MAKE A NEW ROLL AND UPDATE GAME */
let makeRoll = (data, socket) => {
    let numDice = data.numDice;
    let state = data.state;
    let id = state.gameId;
    return new Promise((resolve, reject) => {
        const promise = newRoll(numDice, state);
        promise.then((game) => {
            Game.findOneAndUpdate({ _id: id }, {
                players: game.players,
                sockets: game.sockets,      
                curPos: game.curPos,
                returnPos: game.returnPos,
                dice: game.dice,
                validMoves: game.validMoves,
                availableMoves: game.availableMoves,       
                diceUsed: game.diceUsed,
                lastRoll: game.lastRoll,       
                inGame: game.inGame,       
                isRolling: game.isRolling,       
                turn: game.turn,       
                message: game.message,
                winner: game.winner,
                numPlayers: game.numPlayers,             
                highlight: game.highlight,       
                validOne: game.validOne,       
                validTwo: game.validTwo        
            }, { new: true }, (err, game) => {
                if (err) {
                    reject(err);
                }
                resolve({game: game, socket: socket, addSocket: false});
            });
        });
    });
}

/* CREATE A RANDOM ROLL AND ADJUST GAME PROPERTIES */
let newRoll = (numDice, game) => {
    return new Promise((resolve) => {
        let randArr = [];
        for (let i = 0; i < numDice; i++) {
            // random number generation
            let randNum =  Math.floor((Math.random() * 6) + 1);
            // checks if doubles were rolled on second roll and adds dice to array accordingly.
            if (randArr.length === 1 && randNum === randArr[0]) {
                randArr.push(randNum);
                randArr.push(randNum);
                randArr.push(randNum);
            } else {
                randArr.push(randNum);
            }
        }
        let dice = randArr
        // checks if rolling for first turn
        if (!game.inGame) {
            // if turn was white's, switches to black's turn and adds white's roll as lastRoll
            if (game.turn === 'white') {
                game.turn = 'black';
                game.lastRoll = randArr;
            // if roll was black's checks if rolls were a tie and switches back to white's turn to re-roll
            } else if (game.lastRoll[0] === dice[0]) {
                game.turn = 'white';
                game.lastRoll = randArr;
            // if roll was blacks and rolls did not tie, starts game (assuming black had higher roll)
            } else {
                dice = [game.lastRoll[0], dice[0]];
                game.inGame = true;
                game.message = '\'S MOVE';
                game.isRolling = false;
                game.lastRoll = randArr;
                game.returnPos = game.curPos;
                // if white's roll was higher, starts game, giving white the first turn
                if (dice[0] > dice[1]) {
                    game.turn = 'white';
                } 
            }
        // if roll was during the normal game, switches to player's move
        } else {
            game.message = '\'S MOVE';
            game.isRolling = false;
            game.lastRoll = randArr;
            game.returnPos = game.curPos;
        }
        game.availableMoves = dice;
        game.dice = dice;
        resolve(game);
    });
}

module.exports = makeRoll;