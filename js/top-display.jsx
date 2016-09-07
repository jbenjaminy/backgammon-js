var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');
var Dice = require('./dice');

var TopDisplay = React.createClass({
	rollDice: function() {
		this.props.dispatch(actions.rollDice());
	},
	render: function() {
		var playerOneDie = 'singleDie white ';
		var playerIcon = 'icon hidden';
		var playerTwoDie = 'singleDie black ';
		var buttons = 'buttons hidden';
		var midDice = 'mid-dice hidden';
		var diceArr = [];
		if (this.props.players.black.roll) {
			playerOneDie += 'hidden';
			playerTwoDie += 'hidden';
			playerIcon = 'icon';
			buttons = 'buttons';
			midDice = 'mid-dice';
			diceArr = this.props.turn.roll.map(function(die, index) {
			return (
				<li key={index}><Dice image={die}/></li>
			);
		});
		}
		return (
			<div className="top-display">
				<div className="player-one col">
					<h2 className="name">{this.props.players.white.name}</h2>
					<Dice className={playerOneDie} image='one' singleDie='white'/>
					<img src="./white-piece.png" className={playerIcon}/>
				</div>
				<div className="mid col">
					<h2 className='status'>{this.props.turn.name}{this.props.status}</h2>
					<ul className={buttons}><li><button className='end'>End Turn</button></li><li><button className='undo'>Undo Move</button></li><li><button className='restart'>Restart Game</button></li></ul>
					<ul className={midDice} onClick={this.rollDice}>{diceArr}</ul>
				</div>
				<div className="player-two col">
					<h2 className="name">{this.props.players.black.name}</h2>
					<Dice className={playerTwoDie} image='one' singleDie='black'/>
					<img src="./black-piece.png" className={playerIcon}/>
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		turn: state.players[state.turn],
		status: state.status,
		players: state.players
	};
};

module.exports = connect(mapStateToProps)(TopDisplay);