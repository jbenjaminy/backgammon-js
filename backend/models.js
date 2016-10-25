const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    players: {
    	type: Object,
    	required: true
    },
    sockets: {
        type: Object,
        required: true
    },
    curPos: {
        type: Object,
        required: true
    },
    returnPos: {
        type: Object
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
    lastRoll: {
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
    winner: {
        type: String
    },
    numPlayers: {
        type: Number
    },
    highlight: {
    	type: Number
    },
    validOne: {
    	type: Number
    },
    validTwo: {
    	type: Number
    }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;