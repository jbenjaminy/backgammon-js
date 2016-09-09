var React = require('react');
var ReactDOM = require('react-dom');
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
			}, 1000);
		}
	},
	finishTurn: function() {
			this.props.dispatch(actions.endTurn());
	},
	restartGame: function() {
		this.props.dispatch(actions.pageLoad());
		this.props.dispatch(actions.newGame());
	},
	render: function() {
		var diceUsed = this.props.diceUsed;
		var diceArr = this.props.dice.map(function(dice, index) {
			if ((diceUsed.length === 1 && index === diceUsed[0]) || (diceUsed.length > 1 && index < diceUsed.length)) {
				return (
					<li key={index}><Dice image={dice + 10}/></li>
				)
			} else {
				return (
					<li key={index}><Dice image={dice}/></li>
				);
			}
		});
		var buttons = 'buttons hidden';
		var status = 'status pad';
		var white = 'white';
		var black = 'black turn';
		// var endClasses = 'end ';
		if (this.props.inGame) {
			status = 'status';
			buttons = 'buttons';
		}
		if (this.props.turn === 'white') {
			white = 'white turn';
			black = 'black';
		}
		var endArr = [<button key='1' className='end'>End Turn</button>];
		if (!this.props.rolling && this.props.inGame) {
			if (this.props.availableMoves.length === 0 || (this.props.highlight && this.props.validMoves.length === 0)) {
				endArr = [<button key='1' className='end green' onClick={this.finishTurn}>End Turn</button>];
			}
		}
		return (
			<div className="top-display">
				<div className="player-one col">
					<h2 className={white}>{this.props.players.white.name}&nbsp;&nbsp;<img src="./white-piece.png" className='icon'/></h2>
				</div>
				<div className="mid col">
					<h3 className={status}>{this.props.curPlayer.name}{this.props.message}</h3>
					<ul className={buttons}><li>{endArr}</li><li><button className='undo'>Undo Move</button></li><li><button className='restart' onClick={this.restartGame}>Restart Game</button></li></ul>
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
		availableMoves: state.availableMoves,
		validMoves: state.validMoves,
		diceUsed: state.diceUsed,
		highlight: state.highlight
	};
};

module.exports = connect(mapStateToProps)(TopDisplay);