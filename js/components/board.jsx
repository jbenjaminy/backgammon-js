import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Space from './space';
import Bar from './bar';
import Home from './home';
import Piece from './piece';

const propTypes = {
	dispatch: PropTypes.func,
	state: PropTypes.object
};

class Board extends React.Component {
	constructor() {
		super();
		this.selectSpace = this.selectSpace.bind(this);
	}
	selectSpace(id, callback) {
		let props = this.props;
		return function callback() {
			if (!props.state.isRolling && props.state.availableMoves.length > 0 && props.state.inGame) {
				if (props.state.highlight === id) {
					return props.dispatch({
						type: 'server/unhighlight',
						data: props.state
					});
				} else if (props.state.highlight && props.state.validMoves.length > 0) {
					let validMoves = props.state.validMoves;
					for (let move of validMoves) {
						if (move.position === id) {
							id = null;
							return props.dispatch({
								type: 'server/updatePositions',
								data: {
									state: props.state,
									toPos: move.position,
									roll: move.roll
								}
							});
							break
						} else if (validMoves.indexOf(move) === (props.state.validMoves.length - 1)) {
							return props.dispatch({
								type: 'server/unhighlight',
								data: props.state
							});
						}
					}
				} else if ((props.state.curPos[id][props.state.turn] > 0 && !props.state.curPos[21][props.state.turn]) || (id === 21 && props.state.curPos[id][props.state.turn])) {
					console.log('here');
					return props.dispatch({
						type: 'server/findValidMoves',
						data: {
							state: props.state,
							fromPos: id
						}
					});
				} else if (props.state.highlight && props.state.validMoves.length === 0) {
					return props.dispatch({
						type: 'server/unhighlight',
						data: props.state
					});
				}
			} else if (props.state.highlight) {
				return props.dispatch({
					type: 'server/unhighlight',
					data: props.state
				});
			}
		}
	}
	render() {
		console.log(this.props.state);
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
					container = <li className={homeClasses} key={i} onClick={this.selectSpace(i)}><Home pieces={pieces}/></li>;
				} else if (i === 8 || i === 21) {
					container = <li className={barClasses} key={i} onClick={this.selectSpace(i)}><Bar pieces={pieces}/></li>;
				} else {
					container = <li className={spaceClasses} key={i} onClick={this.selectSpace(i)}><Space pieces={pieces}/></li>;
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

Board.propTypes = propTypes;
module.exports = connect(mapStateToProps)(Board);