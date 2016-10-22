import React from 'react';
import {connect} from 'react-redux';
import Space from './space';
import Bar from './bar';
import Home from './home';
import Piece from './piece';

class Board extends React.Component {
	constructor() {
		super();
		this.selectSpace = this.selectSpace.bind(this);
	}
	selectSpace(id) {
		if (!this.props.state.isRolling && this.props.state.availableMoves.length > 0 && this.props.state.inGame) {
			if (this.props.state.highlight === id) {
				return this.props.dispatch({
					type: 'server/unhighlight',
					data: this.props.state
				});
			} else if (this.props.state.highlight && this.props.state.validMoves.length > 0) {
				let validMoves = this.props.state.validMoves;
				for (let move of validMoves) {
					if (move.position === id) {
						id = null;
						return this.props.dispatch({
							type: 'server/updatePositions',
							data: {
								state: this.props.state,
								toPos: move.position,
								roll: move.roll
							}
						});
						break
					} else if (validMoves.indexOf(move) === (this.props.state.validMoves.length - 1)) {
						return this.props.dispatch({
							type: 'server/unhighlight',
							data: this.props.state
						});
					}
				}
			} else if ((this.props.state.curPos[id][this.props.state.turn] > 0 && !this.props.state.curPos[21][this.props.state.turn]) || (id === 21 && this.props.state.curPos[id][this.props.state.turn])) {
				console.log('here');
				return this.props.dispatch({
					type: 'server/findValidMoves',
					data: {
						state: this.props.state,
						fromPos: id
					}
				});
			} else if (this.props.state.highlight && this.props.state.validMoves.length === 0) {
				return this.props.dispatch({
					type: 'server/unhighlight',
					data: this.props.state
				});
			}
		} else if (this.props.state.highlight) {
			return this.props.dispatch({
				type: 'server/unhighlight',
				data: this.props.state
			});
		}
	}
	render() {
		console.log('state ----->', this.props.state);
		let topBoard = [];
		let bottomBoard = [];
		if (this.props.state.curPos) {
			for (let i = 1; i < 29; i++) {
				let homeClasses = 'home ';
				let barClasses = 'bar ';
				let spaceClasses = 'space ';
				let pieces = [];
				if (i === this.props.state.highlight) {
					homeClasses += 'highlight';
					barClasses += 'highlight';
					spaceClasses += 'highlight';
				}
				if (i === this.props.state.validOne || i === this.props.state.validTwo) {
					homeClasses += 'valid';
					spaceClasses += 'valid';
				}
				if (this.props.state.curPos[i].white) {
					for (let j = 1; j <= this.props.state.curPos[i].white; j++) {
						pieces.push(<Piece color='white'/>);
					}
				}
				if (this.props.state.curPos[i].black) {
					for (let j = 1; j <= this.props.state.curPos[i].black; j++) {
						pieces.push(<Piece color='black'/>);
					}
				}
				let container = '';
				if (i === 1 || i === 28) {
					container = <li className={homeClasses} key={i} onClick={this.selectSpace.bind(this, i)}><Home pieces={pieces}/></li>;
				} else if (i === 8 || i === 21) {
					container = <li className={barClasses} key={i} onClick={this.selectSpace.bind(this, i)}><Bar pieces={pieces}/></li>;
				} else {
					container = <li className={spaceClasses} key={i} onClick={this.selectSpace.bind(this, i)}><Space pieces={pieces}/></li>;
				}
				if (i < 15) {
					topBoard.unshift(container);
				} else {
					bottomBoard.push(container);
				}
			}	
		}
		return (
			<div className='board'>
				<ul className='board-top'>{topBoard}</ul>
				<ul className='board-bottom'>{bottomBoard}</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state: state
	};
};

module.exports = connect(mapStateToProps)(Board);