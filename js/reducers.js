var actions = require('./actions');

var reducers = function(state, action) {
  state = state || {};

  if (action.type === actions.NEW_GAME) {
    return Object.assign({}, {
      players: {
        white: {name: 'Player 1', roll: null},
        black: {name: 'Player 2', roll: null}
      },
    	positions: {
        1: {white: null, black: null}, 2: {white: null, black: 2}, 3: {white: null, black: null}, 4: {white: null, black: null}, 5: {white: null, black: null}, 6: {white: null, black: null}, 7: {white: 5, black: null}, 8: {white: null, black: null}, 9: {white: null, black: null}, 10: {white: 3, black: null}, 11: {white: null, black: null}, 12: {white: null, black: null}, 13: {white: null, black: null}, 14: {white: null, black: 5}, 15: {white: 5, black: null}, 16: {white: null, black: null}, 17: {white: null, black: null}, 18: {white: null, black: null}, 19: {white: null, black: 3}, 20: {white: null, black: null}, 21: {white: null, black: null}, 22: {white: null, black: 5}, 23: {white: null, black: null}, 24: {white: null, black: null}, 25: {white: null, black: null}, 26: {white: null, black: null}, 27: {white: 2, black: null}, 28: {white: null, black: null} 
      },
      inGame: false,
      message: ': roll for first turn',
      dice: [1],
      turn: 'white',
      highlight: null,
    });
  } else if (action.type === actions.FIRST_ROLL) {
    var roll = [2];
    var dice = roll;
    var turn = 'black';
    var message = state.message;
    var inGame = state.inGame;
    if (action.player === 'black') {
      roll = [4];
      message = '\'s move';
      inGame = true,
      dice = [state.players.white.roll[0], roll[0]];
      if (state.players.white.roll[0] > roll[0]) {
        turn = 'white';
      }
    }
    var players = state.players;
    players[action.player].roll = roll;
    return Object.assign({}, state, {
      players: players,
      turn: turn,
      inGame: inGame,
      message: message,
      dice: dice

    });
  } else if (action.type === actions.ROLL_DICE) {
    var roll = [3, 6];
    var message = '\'s move';
    if (roll[0] === roll[1]) {
      roll.push(roll[0]);
      roll.push(roll[0]);
    }
    var players = state.players;
    players[state.turn].roll = roll;
    return Object.assign({}, state, {
      players: players,
      message: message,
      dice: roll
    });
  } else if (action.type === actions.END_TURN) {
    var message = '\'s roll';
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