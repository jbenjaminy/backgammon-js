const Game = require('../models');

/* RESTART GAME BY ACCESS CODE */
let restartGame = (data) => {
  let accessCode = data.accessCode;
  let turn = data.turn;
  return new Promise((resolve, reject) => {
    // switches current turn to let loser move first
    turn = turn === 'Red' ? 'Blue' : 'Red';

    Game.findOneAndUpdate(
      { accessCode }, {
        turn: turn,
        gameArray: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
        isWinner: false,
      }, { new: true }, (err, game) => {
      if (err) {
        reject(err);
      }
      resolve(game);
    });
  });
}

module.exports = restartGame;