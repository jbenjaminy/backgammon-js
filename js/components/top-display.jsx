import React from 'react';
import {connect} from 'react-redux';
import Dice from './dice';

class TopDisplay extends React.Component {
	constructor() {
		super();
		this.rollDice = this.rollDice.bind(this);
		this.endTurn = this.endTurn.bind(this);
		this.restartGame = this.restartGame.bind(this);
	}

	rollDice() {
		if (this.props.state.isRolling) {
			this.props.dispatch({
				type: 'server/rollDice',
				data: this.props.state
			});
			setTimeout(() => {
				if (!this.props.state.inGame) {
					this.props.dispatch({
						type: 'server/makeRoll',
						data: {
							state: this.props.state,
							numDice: 1
						}
					});
				} else {
					this.props.dispatch({
						type: 'server/makeRoll',
						data: {
							state: this.props.state,
							numDice: 2
						}
					});
				}
			}, 1000);
		}
	}

	endTurn() {
		if (this.props.state.inGame) {
			this.props.dispatch({
				type: 'server/endTurn',
				data: this.props.state
			});
		}
	}

	restartGame() {
		this.props.dispatch({
			type: 'server/restartGame',
			data: this.props.state
		});
	}

	render() {
		let white = 'white';
		let black = 'black turn';
		if (this.props.state.turn === 'white') {
			white = 'white turn';
			black = 'black';
		}
		let buttons = 'buttons hidden';
		let status = 'status pad';
		if (this.props.state.inGame || this.props.state.winner) {
			status = 'status';
			buttons = 'buttons';
		}
		let diceArr = this.props.state.dice.map((dice, index) => {
			let diceUsed = this.props.state.diceUsed;
			if ((diceUsed.length === 1 && index === diceUsed[0]) || (diceUsed.length > 1 && index < diceUsed.length)) {
				return (
					<li key={index}><Dice image={dice + 10}/></li>
				)
			} else {
				dice = dice.toString();
				return (
					<li key={index}><Dice image={dice}/></li>
				);
			}
		});
		let endArr = [<button key='1' className='end'>End Turn</button>];
		if (!this.props.state.isRolling && this.props.state.inGame) {
			if (this.props.state.availableMoves.length === 0 || (this.props.state.highlight && this.props.state.validMoves.length === 0)) {
				endArr = [<button key='1' className='end green' onClick={this.endTurn}>End Turn</button>];
			}
		}
		let restartArr = [<button key='3' className='restart' onClick={this.restartGame}>Restart Game</button>];
		if (this.props.state.winner) {
			restartArr = [<button key='3' className='restart green' onClick={this.restartGame}>Restart Game</button>];
		}
		return (
			<div className='top-display'>
				<div className='player-one col'>
					<h2 className={white}>{this.props.state.players.white}&nbsp;&nbsp;<img src='./white-piece.png' className='icon'/></h2>
				</div>
				<div className='mid col'>
					<h3 className={status}>{this.props.state.players[this.props.state.turn]}{this.props.state.message}</h3>
					<ul className={buttons}><li>{endArr}</li><li><button className='undo'>Undo Move</button></li><li>{restartArr}</li></ul>
					<ul className='dice' onClick={this.rollDice}>{diceArr}</ul>
				</div>
				<div className='player-two col'>
					<h2 className={black}>{this.props.state.players.black}&nbsp;&nbsp;<img src='./black-piece.png' className='icon'/></h2>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		state: state
	};
};

module.exports = connect(mapStateToProps)(TopDisplay);