const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    players: {
    	type: Object,
    	required: true
    },
    curPos: {
        type: Object,
        required: true
    },
    dice: {
    	type: Array
    },
    validMoves: { 
    	type: Array
    },
    availableMoves: {
    	type: Array
    },
    diceUsed: {
    	type: Array
    },
    inGame: {
    	type: Boolean
    },
    isRolling: {
    	type: Boolean
    },
    turn: {
    	type: String
    },
    message: {
    	type: String
    },
    lastRoll: {
    	type: String
    },
    highlight: {
    	type: String
    },
    validOne: {
    	type: String
    },
    validTwo: {
    	type: String
    },
    winner: {
    	type: String
    }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;