const Game = require('../models');

/* CHECKS FOR VALID MOVES AND UPDATE GAME */
let findValidMoves = (data) => {
    let start = data.start;
    let state = data.state;
    let id = state.gameId;
    return new Promise((resolve, reject) => {
        const promise = checkMoves(start, state);
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

/* CHECKS TO SEE IF SELECTED POSITION HAS ANY VALID MOVES */
let checkMoves = (start, game) => {
	let player = game.turn;
	let moves = game.availableMoves;
	let pos = game.curPos;
	let validMoves = [];
    return new Promise((resolve, reject) => {
    	// checks if trying to move from one of the home spaces, and returns no valid moves
    	if (start === 1 || start === 28) {
    		game.validMoves = validMoves;
    		resolve(game);
    	}
    	// for the from position, checks each move from the available moves to see if it is valid
    	for (let move of moves) {
    		// checks that move is from current player's occupied space and if all white pieces are in white's home quadrant and they are ready to move home
    		if ((player === 'white') && (pos[start].white > 0) && ((pos[1].white + pos[2].white + pos[3].white + pos[4].white + pos[5].white + pos[6].white + pos[7].white) === 15)) {
    			// sets up variable for position of resultant move and adjusts if it is past the home space
    			let end = start - move;
    			if (end < 1) {
					end = 1;
    			}
    			// checks that 'end' space is not occupied by more than one black piece, and that a move to the home space is either an exact roll or that there are no pieces further from the home space than the piece being moved.
    			if (((pos[end].black === 1) || (pos[end].black === 0)) && ((start - 1 >= move) || ((pos[start + 1].white + pos[start + 2].white + pos[start + 3].white + pos[start + 4].white + pos[start + 5].white) === 0))) {
    				// if everything checks out, adds move as valid move
    				validMoves.push({'position': end, 'roll': move});
    			}
    		// repeats same process as lines 53 through 64 for black
    		} else if ((player === 'black') && (pos[start].black > 0) && ((pos[22].black + pos[23].black + pos[24].black + pos[25].black + pos[26].black + pos[27].black + pos[28].black) === 15)) {
    			let end = start - move;
    			if (end > 28) {
					end = 28;
    			}
    			if (((pos[end].white === 1) || (pos[end].white === 0)) && ((28 - start >= move) || ((pos[start - 1].black + pos[start - 2].black + pos[start - 3].black + pos[start - 4].black + pos[start - 5].black) === 0))) {
    				validMoves.push({'position': end, 'roll': move});
    			}
    		// if player is not ready to move home, checks that they are either moving from a space they occupy and have no pieces on the bar, or are moving from the bar if they do have pieces on the bar.
    		} else if (((pos[start][player] > 0) && (pos[21][player] < 1)) || ((start === 21) && (pos[21][player] >= 1))) {
                // if player is white, moves piece clockwise
    			if (player === 'white') {
    				end = start - move;
    				// if move crosses the bar, it is not included as a space in the projected 'end' position
    				if (((start > 21) && (end <= 21)) || ((start > 8) && (end <= 8))) {
    					end = end - 1;
    				// for cases where player is rolling off the bar
    				} else if (start === 21) {
    					end = 28 - move;
    				}
       				// checks that 'end' position is not the home space and opponent has one or no pieces on the space
    				if ((end > 1) && ((pos[end].black === 1) || (pos[end].black === 0))) {
    					// if everything checks out, adds move as valid move
    					validMoves.push({'position': end, 'roll': move})
    				}
    			} else if (player === 'black') {
    				// if player is black, moves piece counter-clockwise
    				end = start + move;
    				// if move crosses the bar, it is not included as a space in the projected 'end' position
    				if (((start < 21) && (end >= 21)) || ((start < 8) && (end >= 8))) {
    					end = end + 1;
    				// for cases where player is rolling off the bar
    				} else if (start === 21) {
    					end = 1 + move;
    				}
       				// checks that 'end' position is not the home space and opponent has one or no pieces on the space
    				if ((end < 28) && ((pos[end].white === 1) || (pos[end].white === 0))) {
    					// if everything checks out, adds move as valid move
    					validMoves.push({'position': end, 'roll': move})
    				}
    			}
    		}
    	}
    	game.highlight = start;
    	game.validMoves = validMoves;
    	game.validOne = null;
        game.validTwo = null;
        if (validMoves.length === 1 || validMoves.length === 3 || validMoves.length === 4) {
            game.validOne = validMoves[0].position;
        } else if (validMoves.length === 2) {
            game.validOne = validMoves[0].position;
            game.validTwo = validMoves[1].position;
        }
        resolve(game);
    });
}

module.exports = findValidMoves;