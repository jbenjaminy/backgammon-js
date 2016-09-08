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
            validMoves: null,
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
        });
    } else if (action.type === actions.SELECT) {
        var highlight = action.id;
        if (state.highlight === highlight) {
            highlight = null;
        }
        return Object.assign({}, state, {
            highlight: highlight,
        });
    } else if (action.type === actions.FIND_VALID_MOVES_SUCCESS) {

    } else if (action.type === actions.FIND_VALID_MOVES_ERROR) {
        console.error(action.error);
        return state;
    } else if (action.type === actions.UPDATE_POSITIONS_SUCCESS) {
        return Object.assign({}, state, {
            positions: action.positions,
            highlight: null,
        });
    } else if (action.type === actions.FIND_VALID_MOVES_ERROR) {
        console.error(action.error);
        return state;
    } else {
        return state;
    }
};

module.exports = reducers;