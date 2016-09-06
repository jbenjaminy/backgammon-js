var fetch = require('isomorphic-fetch');

var NEW_GAME = 'NEW_GAME';
var newGame = function() {
  return {
    type: NEW_GAME
  };
};

/*----------- EXPORTS ----------*/
exports.NEW_GAME = NEW_GAME;
exports.newGame = newGame;