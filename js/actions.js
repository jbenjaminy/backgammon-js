var fetch = require('isomorphic-fetch');

var PAGE_LOAD = 'PAGE_LOAD';
var pageLoad = function() {
    return {
        type: PAGE_LOAD
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

var newGame = function() {
    return function(dispatch) {
        var url = 'http://localhost:5000/new_game';
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
        .then(function(positions) {
            return dispatch(
                newGameSuccess(positions)
            );
        })
        .catch(function(error) {
            return dispatch(
                newGameError(error)
            );
        });
    }
};

var NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';
var newGameSuccess = function(positions) {
    return {
        type: NEW_GAME_SUCCESS,
        positions: positions
    };
};

var NEW_GAME_ERROR = 'NEW_GAME_ERROR';
var newGameError = function(error) {
    return {
        type: NEW_GAME_ERROR,
        error: error
    };
};

var makeRoll = function(numDice) {
    return function(dispatch) {
        var url = 'http://localhost:5000/roll/' + numDice;
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

var findValidMoves = function(id) {
    return function(dispatch) {
        var url = 'http://localhost:5000/valid_moves/' + id;
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
        .then(function(validMoves) {
            return dispatch(
                findValidMovesSuccess(validMoves)
            );
        })
        .catch(function(error) {
            return dispatch(
                findValidMovesError(error)
            );
        });
    }
};

var FIND_VALID_MOVES_SUCCESS = 'FIND_VALID_MOVES_SUCCESS';
var findValidMovesSuccess = function(validMoves) {
    return {
        type: FIND_VALID_MOVES_SUCCESS,
        validMoves: validMoves
    };
};

var FIND_VALID_MOVES_ERROR = 'FIND_VALID_MOVES_ERROR';
var findValidMovesError = function(error) {
    return {
        type: FIND_VALID_MOVES_ERROR,
        error: error
    };
};

var updatePositions = function(toPos, fromPos) {
    return function(dispatch) {
        var url = 'http://localhost:5000/update_pos/' + toPos + '/' + fromPos;
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
        .then(function(positions) {
            return dispatch(
                updatePositionsSuccess(positions)
            );
        })
        .catch(function(error) {
            return dispatch(
                updatePositionsError(error)
            );
        });
    }
};

var UPDATE_POSITIONS_SUCCESS = 'UPDATE_POSITIONS_SUCCESS';
var updatePositionsSuccess = function(positions) {
    return {
        type: UPDATE_POSITIONS_SUCCESS,
        positions: positions
    };
};

var UPDATE_POSITIONS_ERROR = 'UPDATE_POSITIONS_ERROR';
var updatePositionsError = function(error) {
    return {
        type: UPDATE_POSITIONS_ERROR,
        error: error
    };
};

/*----------- EXPORTS ----------*/
exports.PAGE_LOAD = PAGE_LOAD;
exports.pageLoad = pageLoad;

exports.ROLL_DICE = ROLL_DICE;
exports.rollDice = rollDice;

exports.SELECT = SELECT;
exports.select = select;

exports.END_TURN = END_TURN;
exports.endTurn = endTurn;

exports.newGame = newGame;
exports.NEW_GAME_SUCCESS = NEW_GAME_SUCCESS;
exports.newGameSuccess = newGameSuccess;
exports.NEW_GAME_ERROR = NEW_GAME_ERROR;
exports.newGameError = newGameError;

exports.makeRoll = makeRoll;
exports.MAKE_ROLL_SUCCESS = MAKE_ROLL_SUCCESS;
exports.makeRollSuccess = makeRollSuccess;
exports.MAKE_ROLL_ERROR = MAKE_ROLL_ERROR;
exports.makeRollError = makeRollError;

exports.findValidMoves = findValidMoves;
exports.FIND_VALID_MOVES_SUCCESS = FIND_VALID_MOVES_SUCCESS;
exports.findValidMovesSuccess = findValidMovesSuccess;
exports.FIND_VALID_MOVES_ERROR = FIND_VALID_MOVES_ERROR;
exports.findValidMovesError = findValidMovesError;

exports.updatePositions = updatePositions;
exports.UPDATE_POSITIONS_SUCCESS = UPDATE_POSITIONS_SUCCESS;
exports.updatePositionsSuccess = updatePositionsSuccess;
exports.UPDATE_POSITIONS_ERROR = UPDATE_POSITIONS_ERROR;
exports.updatePositionsError = updatePositionsError;
