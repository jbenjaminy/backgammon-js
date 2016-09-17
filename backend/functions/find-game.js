const Game = require('../models');

/* FIND GAME BY OBJECT ID */
let findGame = (data) => {
	let id = data._id;
	return new Promise((resolve, reject) => {
		Game.find({ id }, (err, game) => {
			if (err) {
				reject(err);
			}
			resolve(game[0]);
		});
	});
}

module.exports = findGame;
