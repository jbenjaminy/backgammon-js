import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dice = from './dice';

const propTypes = {
  dispatch: PropTypes.func,
};

class TopDisplay extends React.Component {
	constructor() {
		super();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.rollDice = this.rollDice.bind(this);
		this.endTurn = this.endTurn.bind(this);
		this.restartGame = this.restartGame.bind(this);
	}
  	componentDidMount() {
  		this.props.dispatch({
      		type: 'server/findGame',
      		data: {
        		_id: this.props.gameId 
        	}
    	});
  	}
	rollDice() {
		if (this.props.rolling) {
			this.props.dispatch({
				type: 'server/rollDice',
				data: {
					_id: this.props.gameId
				}
			});
			setTimeout(() => {
				if (!this.props.inGame) {
					this.props.dispatch({
						type: 'server/makeRoll',
						data: {
							_id: this.props.gameId,
							numDice: 1
						}
					});
				} else {
					this.props.dispatch({
						type: 'server/makeRoll',
						data: {
							_id: this.props.gameId,
							numDice: 2
						}
					});
				}
			}, 1000);
		}
	}
	endTurn() {
		if (this.props.inGame) {
			this.props.dispatch({
				type: 'server/endTurn',
				data: {
					_id: this.props.gameId
				}
			});
		}
	}
	restartGame() {
		this.props.dispatch({
			type: 'server/restartGame',
			data: {
				_id: this.props.gameId
			}
		});
	}
	render() {
		let diceUsed = this.props.diceUsed;
		let diceArr = this.props.dice.map(function(dice, index) {
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
		let buttons = 'buttons hidden';
		let status = 'status pad';
		let white = 'white';
		let black = 'black turn';
		if (this.props.inGame || this.props.winner) {
			status = 'status';
			buttons = 'buttons';
		}
		if (this.props.turn === 'white') {
			white = 'white turn';
			black = 'black';
		}
		let endArr = [<button key='1' className='end'>End Turn</button>];
		if (!this.props.rolling && this.props.inGame) {
			if (this.props.availableMoves.length === 0 || (this.props.highlight && this.props.validMoves.length === 0)) {
				endArr = [<button key='1' className='end green' onClick={this.endTurn}>End Turn</button>];
			}
		}
		let restartArr = [<button key='3' className='restart' onClick={this.restartGame}>Restart Game</button>];
		if (this.props.winner) {
			restartArr = [<button key='3' className='restart green' onClick={this.restartGame}>Restart Game</button>];
		}
		return (
			<div className="top-display">
				<div className="player-one col">
					<h2 className={white}>{this.props.players.white}&nbsp;&nbsp;<img src="./white-piece.png" className='icon'/></h2>
				</div>
				<div className="mid col">
					<h3 className={status}>{this.props.curPlayer}{this.props.message}</h3>
					<ul className={buttons}><li>{endArr}</li><li><button className='undo'>Undo Move</button></li><li>{restartArr}</li></ul>
					<ul className='dice' onClick={this.rollDice}>{diceArr}</ul>
				</div>
				<div className="player-two col">
					<h2 className={black}>{this.props.players.black}&nbsp;&nbsp;<img src="./black-piece.png" className='icon'/></h2>
				</div>
			</div>
		);
	}
};

var mapStateToProps = (state, props) => {
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
		highlight: state.highlight,
		winner: state.winner,
		gameId: state.gameId
	};
};

TopDisplay.propTypes = propTypes;
export const TopDisplay = connect(mapStateToProps)(TopDisplay);