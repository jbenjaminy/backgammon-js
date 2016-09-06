var actions = require('./actions');

var reducers = function(state, action) {
  state = state || {};

  if (action.type === actions.NEW_GAME) {
    return Object.assign({}, {
    	positions: {
        1: {white: null, black: null}, 2: {white: null, black: 2}, 3: {white: null, black: null}, 4: {white: null, black: null}, 5: {white: null, black: null}, 6: {white: null, black: null}, 7: {white: 5, black: null}, 8: {white: null, black: null}, 9: {white: null, black: null}, 10: {white: 3, black: null}, 11: {white: null, black: null}, 12: {white: null, black: null}, 13: {white: null, black: null}, 14: {white: null, black: 5}, 15: {white: 5, black: null}, 16: {white: null, black: null}, 17: {white: null, black: null}, 18: {white: null, black: null}, 19: {white: null, black: 3}, 20: {white: null, black: null}, 21: {white: null, black: null}, 22: {white: null, black: 5}, 23: {white: null, black: null}, 24: {white: null, black: null}, 25: {white: null, black: null}, 26: {white: null, black: null}, 27: {white: 2, black: null}, 28: {white: null, black: null} 
      }
    });
  } else {
    return state;
  }
};
 
module.exports = reducers;