import React, { PropTypes } from 'react';
// import Piece from './piece';

const propTypes = {
 	pieces: PropTypes.array.isRequired
};

function Space(props) {
	let piecesArr = props.pieces.map((piece, index) => {
		return <li key={index}>{piece}</li>;
	});
	return <ul>{piecesArr}</ul>;
}

Space.propTypes = propTypes;

module.exports = Space;