const Game = require('../models');

/* FIND GAME BY OBJECT ID */
let findGame = (data) => {
	return new Promise((resolve, reject) => {
		Game.find({ _id: data }, (err, game) => {
			if (err) {
				reject(err);
			}
			resolve(game[0]);
		});
	});
}

module.exports = findGame;
