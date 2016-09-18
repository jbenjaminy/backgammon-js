import React, { PropTypes } from 'react';
// import Piece from './piece';

const propTypes = {
	value: PropTypes.number.isRequired
};

export function Bar(props) {
	let piecesArr = props.pieces.map((piece, index) => {
		return <li key={index}>{piece}</li>;
	});
	return <ul>{piecesArr}</ul>;
}

Bar.propTypes = propTypes;
