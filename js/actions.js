var fetch = require('isomorphic-fetch');

var NEW_GAME = 'NEW_GAME';
var newGame = function() {
  	return {
    	type: NEW_GAME
  	};
};

var FIRST_ROLL = 'FIRST_ROLL';
var firstRoll = function(player) {
	return {
		type: FIRST_ROLL,
		player: player
	};
};

var ROLL_DICE = 'ROLL_DICE';
var rollDice = function() {
	return {
		type: ROLL_DICE
	};
};

var END_TURN = 'END_TURN';
var endTurn = function() {
	return {
		type: END_TURN
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

exports.FIRST_ROLL = FIRST_ROLL;
exports.firstRoll = firstRoll;

exports.ROLL_DICE = ROLL_DICE;
exports.rollDice = rollDice;

exports.END_TURN = END_TURN;
exports.endTurn = endTurn;

exports.SELECT = SELECT;
exports.select = select;