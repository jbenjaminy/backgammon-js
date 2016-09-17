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
  	type: Array,
  	required: true
  },
  validMoves: { 
  	type: Array,
  	required: true
  },
  availableMoves: {
  	type: Array,
  	required: true
  },
  diceUsed: {
  	type: Array,
  	required: true
  },
  inGame: {
  	type: Boolean,
  	required: true
  },
  isRolling: {
  	type: Boolean,
  	required: true
  },
  turn: {
  	type: String,
  	required: true
  }
  message: {
  	type: String,
  	required: true
  },
  lastRoll: {
  	type: String,
  	required: false
  },
  highlight: {
  	type: String,
  	required: false
  },
  validOne: {
  	type: String,
  	required: false
  },
  validTwo: {
  	type: String,
  	required: false
  },
  winner: {
  	type: String,
  	required: false
  }

            dice: [1],
            turn: 'white',
            players: {
                white: 'PLAYER ONE',
                black: 'PLAYER TWO'
            },
            message: ': ROLL FOR FIRST TURN',
            inGame: false,
            highlight: null,
            rolling: true,
            validMoves: [],
            availableMoves: [],
            diceUsed: [],
            valid1: null,
            valid2: null,
            winner: null,
            lastRoll: null,

  accessCode: {
    type: String,
    required: true,
  },

  isWinner: {
    type: Boolean,
    required: true,
  },
  turn: {
    type: String,
    required: true,
  },
  players: {
    type: Object,
    required: true
  }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;