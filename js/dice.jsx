var React = require('react');

var Dice = React.createClass({
	render: function() {
		if ((this.props.image === './dice-roll-one.gif') || (this.props.image === './dice-roll-two.gif')) {
			return <img src={this.props.image}/>
		}
		var image = './dice-' + this.props.image + '.png';
	    return <img src={image}/>
	}
});

module.exports = Dice;