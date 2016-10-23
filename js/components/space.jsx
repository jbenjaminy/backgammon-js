import React from 'react';

function Space(props) {
	let piecesArr = props.pieces.map((piece, index) => {
		return <li key={index}>{piece}</li>;
	});
	return <ul>{piecesArr}</ul>;
};

module.exports = Space;