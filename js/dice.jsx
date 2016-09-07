var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');

var Dice = React.createClass({
	firstRoll: function(player) {
		var props = this.props;
		return function() {
	    	props.dispatch(actions.firstRoll(player));
		}
	},
	render: function() {
		var image = './dice-' + this.props.image + '.png';
		if (this.props.singleDie) {
			var player = this.props.singleDie;
			return <img src={image} onClick={this.firstRoll(player)}/>;
		}

	    return <img src={image}/>
	}
});

module.exports = connect()(Dice);