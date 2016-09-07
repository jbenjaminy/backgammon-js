var fetch = require('isomorphic-fetch');

var NEW_GAME = 'NEW_GAME';
var newGame = function() {
  return {
    type: NEW_GAME
  };
};

var SELECT = 'SELECT';
var select = function(id) {
  return {
    type: SELECT,
    id: id
  };
};

/*----------- EXPORTS ----------*/
exports.NEW_GAME = NEW_GAME;
exports.newGame = newGame;

exports.SELECT = SELECT;
exports.select = select;