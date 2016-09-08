var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');
var Dice = require('./dice');

var TopDisplay = React.createClass({
	rollDice: function() {
		if (this.props.rolling) {
			this.props.dispatch(actions.rollDice());
			var props = this.props;
			setTimeout(function() {
				if (!props.inGame) {
					props.dispatch(actions.makeRoll(1));
				} else {
					props.dispatch(actions.makeRoll(2));
				}
			}, 1500);
		}
	},
	finishTurn: function() {
		if (availableMoves.length === 0) {
			this.props.dispatch(actions.endTurn());
		} 
		// TODO: else state.message === 'MUST USE ALL ROLLS BEFORE ENDING TURN'
	},
	restartGame: function() {
		this.props.dispatch(actions.pageLoad());
		this.props.dispatch(actions.newGame());
	},
	render: function() {
		console.log('state -->', this.props.state);
		var diceArr = this.props.dice.map(function(dice, index) {
			var die = dice.toString();
			return (
				<li key={index}><Dice image={dice}/></li>
			);
		});
		var buttons = 'buttons hidden';
		var status = 'status pad'
		var white = 'white'
		var black = 'black turn'
		if (this.props.inGame) {
			status = 'status'
			buttons = 'buttons';
		}
		if (this.props.turn === 'white') {
			white = 'white turn'
			black = 'black'
		}

		return (
			<div className="top-display">
				<div className="player-one col">
					<h2 className={white}>{this.props.players.white.name}&nbsp;&nbsp;<img src="./white-piece.png" className='icon'/></h2>
				</div>
				<div className="mid col">
					<h3 className={status}>{this.props.curPlayer.name}{this.props.message}</h3>
					<ul className={buttons}><li><button className='end' onClick={this.finishTurn}>End Turn</button></li><li><button className='undo'>Undo Move</button></li><li><button className='restart' onClick={this.restartGame}>Restart Game</button></li></ul>
					<ul className='dice' onClick={this.rollDice}>{diceArr}</ul>
				</div>
				<div className="player-two col">
					<h2 className={black}>{this.props.players.black.name}&nbsp;&nbsp;<img src="./black-piece.png" className='icon'/></h2>
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		state: state,
		curPlayer: state.players[state.turn],
		turn: state.turn,
		inGame: state.inGame,
		players: state.players,
		message: state.message,
		dice: state.dice,
		rolling: state.rolling,
		availableMoves: state.availableMoves
	};
};

module.exports = connect(mapStateToProps)(TopDisplay);