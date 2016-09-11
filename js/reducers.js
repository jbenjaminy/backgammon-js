var actions = require('./actions');

var reducers = function(state, action) {
    state = state || {};

    if (action.type === actions.PAGE_LOAD) {
        return Object.assign({}, {
            positions: null,
            dice: [1],
            turn: 'white',
            players: {
                white: {name: 'PLAYER ONE', roll: null, moves: null},
                black: {name: 'PLAYER TWO', roll: null, moves: null}
            },
            message: ': ROLL FOR FIRST TURN',
            inGame: false,
            highlight: null,
            rolling: true,
            validMoves: [],
            availableMoves: [],
            diceUsed: [],
            valid1: null,
            valid2: null,
            winner: null
        });
    } else if (action.type === actions.NEW_GAME_SUCCESS) {
        return Object.assign({}, state, {
            positions: action.positions
        });
    } else if (action.type === actions.NEW_GAME_ERROR) {
        console.error(action.error);
        return state;
    } else if (action.type === actions.ROLL_DICE) {
        var dice = ['./dice-roll-one.gif'];
        if (state.inGame) {
            dice = ['./dice-roll-one.gif', './dice-roll-two.gif'];
        }
        return Object.assign({}, state, {
            dice: dice
        });
    } else if (action.type === actions.MAKE_ROLL_SUCCESS) {
        var dice = action.roll;
        var turn = state.turn;
        var players = state.players;
        players[turn].roll = dice;
        var message = state.message;
        var inGame = state.inGame;
        var rolling = state.rolling;
        if (!state.inGame) {
            if (turn === 'white') {
                turn = 'black';
            } else if (state.players.white.roll[0] === dice[0]) {
                turn = 'white';
                players.black.roll = null;
                players.white.roll = null;
            } else {
                dice = [state.players.white.roll[0], dice[0]];
                inGame = true;
                if (dice[0] > dice[1]) {
                    turn = 'white';
                    message = '\'S MOVE';
                    rolling = false;
                } else {
                    message = '\'S MOVE';
                    rolling = false;
                }
            }
        } else {
            message = '\'S MOVE';
            rolling = false;
        }
        return Object.assign({}, state, {
            dice: dice,
            turn: turn,
            players: players,
            message: message,
            inGame: inGame,
            rolling: rolling,
            availableMoves: dice
        });
    } else if (action.type === actions.MAKE_ROLL_ERROR) {
        console.error(action.error);
        return state;
    } else if (action.type === actions.END_TURN) {
        var message = '\'S ROLL';
        var turn = 'white';
        if (state.turn === 'white') {
            turn = 'black';
        }
        return Object.assign({}, state, {
            message: message,
            turn: turn,
            rolling: true,
            diceUsed: [],
            highlight: null,
            valid1: null,
            valid2: null

        });
    } else if (action.type === actions.SELECT) {
        var highlight = action.id;
        var valid1 = state.valid1;
        var valid2 = state.valid2;
        if (state.highlight === highlight) {
            highlight = null;
            valid1 = null;
            valid2 = null;
        }
        return Object.assign({}, state, {
            highlight: highlight,
            valid1: valid1,
            valid2: valid2
        });
    } else if (action.type === actions.UNHIGHLIGHT) {
        return Object.assign({}, state, {
            highlight: null,
            valid1: null,
            valid2: null
        });
    } else if (action.type === actions.END_GAME) {
        return Object.assign({}, state, {
            winner: action.winner,
            message: ' WINS!',
            inGame: false
        });   
    } else if (action.type === actions.FIND_VALID_MOVES_SUCCESS) {
        var valid1 = null;
        var valid2 = null;
        if (action.validMoves.length === 1 || action.validMoves.length === 4) {
            valid1 = action.validMoves[0].position;
        } else if (action.validMoves.length === 2) {
            valid1 = action.validMoves[0].position;
            valid2 = action.validMoves[1].position;
        }
        return Object.assign({}, state, {
            validMoves: action.validMoves,
            highlight: action.id,
            valid1: valid1,
            valid2: valid2
        });
    } else if (action.type === actions.FIND_VALID_MOVES_ERROR) {
        console.error(action.error);
        return state;
    } else if (action.type === actions.UPDATE_POSITIONS_SUCCESS) {
        var moves = state.availableMoves;
        var removeme = action.roll; 
        var used = [];
        var message = state.message;
        var inGame = state.inGame;
        var winner = state.winner;
        var positions = action.positions;
        var moves = state.availableMoves.filter(function(val, index) {
            if (val === removeme) {
                if (state.diceUsed.length === 0) {
                    used.push(index);
                } else if (state.diceUsed.length === 1) {
                    used = [0, 1];
                } else if (state.diceUsed.length === 2) {
                    used = [0, 1, 2];
                } else {
                    used = [0, 1, 2, 3];
                }
                removeme = null; 
                return false;
            } return true;
        });
        if (positions[1].white === 15 || positions[28].black === 15) {
            message = ' WINS!';
            winner = state.turn;
            inGame = false;
        }
        return Object.assign({}, state, {
            availableMoves: moves,
            positions: positions,
            highlight: null,
            valid1: null,
            valid2: null,
            diceUsed: used,
            inGame: inGame,
            message: message,
            winner: winner
        });
    } else if (action.type === actions.UPDATE_POSITIONS_MOVES_ERROR) {
        console.error(action.error);
        return state;
    } else {
        return state;
    }
};

module.exports = reducers;