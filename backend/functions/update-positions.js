const Game = require('../models');

/* CHANGES POSITIONS TO REFLECT PLAYER'S MOVE AND UPDATES GAME */
let updatePositions = (data) => {
    let toPos = data.toPos;
    let roll = data.roll;
    let state = data.state;
    let id = state.gameId;
    return new Promise((resolve, reject) => {
        const promise = adjustPos(toPos, roll, state);
        promise.then((game) => {
            Game.findOneAndUpdate({ _id: id }, {
                players: game.players,      
                curPos: game.curPos,
                dice: game.dice,
                validMoves: game.validMoves,
                availableMoves: game.availableMoves,       
                diceUsed: game.diceUsed,       
                inGame: game.inGame,       
                isRolling: game.isRolling,       
                turn: game.turn,       
                message: game.message,       
                lastRoll: game.lastRoll,       
                highlight: game.highlight,       
                validOne: game.validOne,       
                validTwo: game.validTwo,       
                winner: game.winner    
            }, { new: true }, (err, game) => {
                if (err) {
                    reject(err);
                }
                resolve(game);
            });
        });
    });
}

/* ADJUSTS POSITIONS TO REFLECT PLAYER'S MOVE */
let adjustPos = (toPos, removeMe, game) => {
    let pos = game.curPos;
    let fromPos = game.highlight;
    let to = pos[toPos];
    let frm = pos[fromPos];
    return new Promise((resolve) => {
        // checks if the 'from-position' contains white pieces
        if (frm.white) {
            // subtracts a white piece from the 'from-position' and adds to the 'to-position'
            frm.white -= 1;
            to.white += 1;
            // checks if also trapping a black piece with the move
            if (to.black === 1) {
                to.black -= 1;
                pos[21].black += 1;
            }
        // repeats lines 46 through 55 for black
        } else if (frm.black) {
            frm.black -= 1;
            to.black += 1;
            if (to.white === 1) {
                to.white -= 1;
                pos[21].white += 1;
            }
        }
        let used = [];
        // take used up move out of available move array
        let moves = game.availableMoves.filter((val, index) => {
            if (val === removeMe) {
                // if this was the first move used, push onto used array to grey out appropriate dice image
                if (game.diceUsed.length < 1) {
                    used.push(index);
                // if this was second move used, either all moves are used or in the case of doubles the first two of four moves are used
                } else if (game.diceUsed.length === 1) {
                    used = [0, 1];
                // for 3 of 4 dice being used (doubles only)
                } else if (state.diceUsed.length === 2) {
                    used = [0, 1, 2];
                // for 4 of 4 dice being used (doubles only)
                } else {
                    used = [0, 1, 2, 3];
                }
                removeMe = null; 
                return false;
            } return true;
        });
        // checks if most recent move resulted in a win
        if (pos[1].white === 15 || pos[28].black === 15) {
            game.message = ' WINS!';
            game.winner = game.turn;
            game.inGame = false;
        }
        game.curPos = pos;
        game.availableMoves = moves;
        game.diceUsed = used;
        game.highlight = null;
        game.validOne = null;
        game.validTwo = null;
        resolve(game);
    });
}

module.exports = updatePositions;
