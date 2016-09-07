var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');
var Dice = require('./dice');

var TopDisplay = React.createClass({
	rollDice: function() {
		if (!this.props.inGame) {
			this.props.dispatch(actions.firstRoll(this.props.turn));
		} else {
			this.props.dispatch(actions.rollDice());
		}
	},
	finishTurn: function() {
		this.props.dispatch(actions.endTurn());
	},
	restartGame: function() {
		this.props.dispatch(actions.newGame());
	},
	render: function() {
		var diceArr = this.props.dice.map(function(dice, index) {
			var die = dice.toString();
			return (
				<li key={index}><Dice image={dice}/></li>
			);
		});
		var buttons = 'buttons hidden';
		if (this.props.inGame) {
			buttons = 'buttons';
		}
		return (
			<div className="top-display">
				<div className="player-one col">
					<h2 className="name">{this.props.players.white.name}</h2>
					<img src="./white-piece.png" className='icon'/>
				</div>
				<div className="mid col">
					<h2 className='status'>{this.props.curPlayer.name}{this.props.message}</h2>
					<ul className={buttons}><li><button className='end' onClick={this.finishTurn}>End Turn</button></li><li><button className='undo'>Undo Move</button></li><li><button className='restart' onClick={this.restartGame}>Restart Game</button></li></ul>
					<ul className='midDice' onClick={this.rollDice}>{diceArr}</ul>
				</div>
				<div className="player-two col">
					<h2 className="name">{this.props.players.black.name}</h2>
					<img src="./black-piece.png" className='icon'/>
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		curPlayer: state.players[state.turn],
		turn: state.turn,
		inGame: state.inGame,
		players: state.players,
		message: state.message,
		dice: state.dice
	};
};

module.exports = connect(mapStateToProps)(TopDisplay);