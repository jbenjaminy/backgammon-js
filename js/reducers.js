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
        } else {
          message = '\'S MOVE';
        }
      }
    } else {
      message = '\'S MOVE';
    }
    return Object.assign({}, state, {
      dice: dice,
      turn: turn,
      players: players,
      message: message,
      inGame: inGame
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
      turn: turn
    });
  } else if (action.type === actions.SELECT) {
    var highlight = action.id;
    var positions = state.positions;
    if (state.highlight) {
      if (highlight !== state.highlight) {
        var hl = positions[highlight];
        var shl = positions[state.highlight];
        if (shl.white && (!hl.black || hl.black === 1)) {
          shl.white = shl.white - 1;
          hl.white = hl.white + 1;
          if (hl.black) {
            hl.black = hl.black - 1;
            positions[21].black = positions[21].black + 1;
          }
        } else if (shl.black && (!hl.white || hl.white === 1)) {
          shl.black = shl.black - 1;
          hl.black = hl.black + 1;
          if (hl.white) {
            hl.white = hl.white - 1;
            positions[21].white = positions[21].white + 1;
          }
        }
      }
      highlight = null;
    }
    return Object.assign({}, state, {
      highlight: highlight,
      positions: positions,
    });
  } else {
    return state;
  }
};
 
module.exports = reducers;