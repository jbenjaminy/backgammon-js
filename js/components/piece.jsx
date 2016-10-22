import React, { PropTypes } from 'react';

const propTypes = {
    color: PropTypes.string.isRequired
};

function Piece(props) {
    let pieceSrc = './white-piece.png';
    let pieceClasses = 'piece white';
  	if (props.color === 'black') {
		pieceSrc = './black-piece.png';
		pieceClasses = 'piece black';
	}
    return(
    	<img className={pieceClasses} src={pieceSrc} />
    );
}

Piece.propTypes = propTypes;

module.exports = Piece;
