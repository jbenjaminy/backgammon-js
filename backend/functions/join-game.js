const Game = require('../models');

/* JOIN GAME BY ACCESS CODE */
let joinGame = (data) => {
  let accessCode = data.accessCode;
  let playerTwo = data.playerTwo;
  return new Promise((resolve, reject) => {
    const promise = findPromise(accessCode);
    promise.then((game) => {
      let players = game[0].players;
      players.Blue = playerTwo;
      Game.findOneAndUpdate({ accessCode,}, {
        isWinner: game[0].isWinner,
        turn: game[0].turn,
        gameArray: game[0].gameArray,
        players: players
      }, { new: true }, (err, game) => {
        if (err) {
          reject(err);
        }
        resolve(game);
      });
    });
  });
}

/* FIND GAME BY ACCESS CODE AS PROMISE */
let findGame = (code) => {
  return new Promise((resolve, reject) => {
    Game.find({ accessCode: code}, (err, game) => {
      if (err) {
        reject(err);
      }
      if (!game.length) {
        reject(err);
      }
      resolve(game);
    });
  });
}

module.exports = joinGame;