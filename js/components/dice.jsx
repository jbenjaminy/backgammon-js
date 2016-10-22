import React, { PropTypes } from 'react';

const propTypes = {
	image: PropTypes.string.isRequired
};

function Dice(props) {
	if ((props.image === './dice-roll-one.gif') || (props.image === './dice-roll-two.gif')) {
		return <img src={props.image}/>
	}
	let image = './dice-' + props.image + '.png';
	    return <img src={image}/>
}

Dice.propTypes = propTypes;

module.exports = Dice;