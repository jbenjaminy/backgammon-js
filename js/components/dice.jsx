import React from 'react';

function Dice(props) {
	if ((props.image === '../img/dice-roll-one.gif') || (props.image === '../img/dice-roll-two.gif')) {
		return <img src={props.image}/>
	}
	let image = `../img/dice-${props.image}.png`;
	    return <img src={image}/>
}

module.exports = Dice;