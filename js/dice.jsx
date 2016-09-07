var React = require('react');

var Dice = React.createClass({
	render: function() {
		var image = './dice-' + this.props.image + '.png';
	    return <img src={image}/>
	}
});

module.exports = Dice;