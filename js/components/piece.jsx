import React from 'react';

function Piece(props) {
    let pieceSrc = '../img/white-piece.png';
    let pieceClasses = 'piece white';
  	if (props.color === 'black') {
		pieceSrc = '../img/black-piece.png';
		pieceClasses = 'piece black';
	}
    return <img className={pieceClasses} src={pieceSrc} />;
};

module.exports = Piece;
