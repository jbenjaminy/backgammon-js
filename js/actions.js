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

var SELECT = 'SELECT';
var select = function(id) {
  	return {
    	type: SELECT,
    	id: id
  	};
};

var END_TURN = 'END_TURN';
var endTurn = function() {
	return {
		type: END_TURN
	};
};

var makeRoll = function(numDice) {
    return function(dispatch) {
        var url = 'http://localhost:8080/roll/' + numDice;
        var request = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
        return fetch(url, request)
        .then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(roll) {
            return dispatch(
                makeRollSuccess(roll)
            );
        })
        .catch(function(error) {
            return dispatch(
                makeRollError(error)
            );
        });
    }
};

var MAKE_ROLL_SUCCESS = 'MAKE_ROLL_SUCCESS';
var makeRollSuccess = function(roll) {
  	return {
    	type: MAKE_ROLL_SUCCESS,
    	roll: roll
  	};
};

var MAKE_ROLL_ERROR = 'MAKE_ROLL_ERROR';
var makeRollError = function(error) {
  	return {
    	type: MAKE_ROLL_ERROR,
    	error: error
  	};
};

/*----------- EXPORTS ----------*/
exports.NEW_GAME = NEW_GAME;
exports.newGame = newGame;

exports.FIRST_ROLL = FIRST_ROLL;
exports.firstRoll = firstRoll;

exports.ROLL_DICE = ROLL_DICE;
exports.rollDice = rollDice;

exports.SELECT = SELECT;
exports.select = select;

exports.END_TURN = END_TURN;
exports.endTurn = endTurn;

exports.makeRoll = makeRoll;
exports.MAKE_ROLL_SUCCESS = MAKE_ROLL_SUCCESS;
exports.makeRollSuccess = makeRollSuccess;
exports.MAKE_ROLL_ERROR = MAKE_ROLL_ERROR;