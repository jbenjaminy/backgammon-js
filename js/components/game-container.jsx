import React from 'react';
import TopDisplay from './top-display';
import Board from './board';

function GameContainer() {
	return (
		<div className='game-container'>
		    <TopDisplay />
		    <Board />
		</div>
	);
}

module.exports = GameContainer;
