import React from 'react';

function Home(props) {
	let piecesArr = props.pieces.map((piece, index) => {
		return <li key={index}>{piece}</li>;
	});
	return <ul>{piecesArr}</ul>;
}

module.exports = Home;