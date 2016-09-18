import React, { PropTypes } from 'react';
// import Piece from './piece';

const propTypes = {
	value: PropTypes.number.isRequired
};

function Home(props) {
	let piecesArr = props.pieces.map((piece, index) => {
		return <li key={index}>{piece}</li>;
	});
	return <ul>{piecesArr}</ul>;
}

Home.propTypes = propTypes;

module.exports = Home;