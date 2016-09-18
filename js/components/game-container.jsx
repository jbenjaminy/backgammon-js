import React from 'react';
import TopDisplay from './top-display';
import Board from './board';

export function GameContainer() {
	return (
		<div className='game-container'>
		    <TopDisplay />
		    <Board />
		</div>
	);
}
