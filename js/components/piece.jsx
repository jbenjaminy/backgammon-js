import React from 'react';

function Piece(props) {
    let pieceSrc = './white-piece.png';
    let pieceClasses = 'piece white';
  	if (props.color === 'black') {
		pieceSrc = './black-piece.png';
		pieceClasses = 'piece black';
	}
    return <img className={pieceClasses} src={pieceSrc} />;
};

module.exports = Piece;
