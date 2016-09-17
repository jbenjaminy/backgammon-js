import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Space = from './space';
import Bar = from './bar';
import Home = from './home';
import Piece = from './piece';

const propTypes = {
	dispatch: PropTypes.func,
	state: PropTypes.object
};

class Board extends React.Component {
	constructor() {
		super();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.selectSpace = this.selectSpace.bind(this);
	}
	componentDidMount() {
  		this.props.dispatch({
      		type: 'server/findGame',
      		data: {
        		_id: this.props.gameId 
        	}
    	});
  	}
	selectSpace(id, callback) {
		return callback() {
			if (!this.props.isRolling && this.props.availableMoves.length > 0 && this.props.inGame) {
				if (this.props.highlight === id) {
					return this.props.dispatch({
						type: 'server/unhighlight',
						data: {
							_id: this.props.gameId
						}
					});
				} else if (this.props.highlight && this.props.validMoves.length > 0) {
					let validMoves = this.props.validMoves;
					for (let move of validMoves) {
						if (move.position === id) {
							id = null;
							return this.props.dispatch({
								type: 'server/updatePositions',
								data: {
									_id: this.props.gameId,
									position: move.position,
									highlight: this.props.highlight,
									roll: move.roll
								}
							});
							break
						} else if (validMoves.indexOf(move) === (this.props.validMoves.length - 1)) {
							return this.props.dispatch({
								type: 'server/unhighlight',
								data: {
									_id: this.props.gameId
								}
							});
						}
					}
				} else if ((this.props.positions[id][this.props.turn] > 0 && !this.props.positions[21][this.props.turn]) || (id === 21 && this.props.positions[id][this.props.turn])) {
			    	let moves = this.props.availableMoves.join('_');
					return this.props.dispatch({
						type: 'server/findValidMoves',
						data: {
							_id: this.props.gameId
							turn: this.props.turn,
							position: id,
							availableMoves: moves
						}
					});
				} else if (this.props.highlight && this.props.validMoves.length === 0) {
					return this.props.dispatch({
						type: 'server/unhighlight',
						data: {
							_id: this.props.gameId
						}
					});
				}
			} else if (this.props.highlight) {
				return this.props.dispatch({
					type: 'server/unhighlight',
					data: {
						_id: this.props.gameId
					}
				});
			}
		}
	},
	render() {
		console.log(this.props.state);
		let topBoard = [];
		let bottomBoard = [];
		if (this.props.positions) {
			for (let i = 1; i < 29; i++) {
				let homeClasses = 'home ';
				let barClasses = 'bar ';
				let spaceClasses = 'space ';
				let pieces = [];
				if (i === this.props.highlight) {
					homeClasses += 'highlight';
					barClasses += 'highlight';
					spaceClasses += 'highlight';
				}
				if (i === this.props.valid1 || i === this.props.valid2) {
					homeClasses += 'valid';
					spaceClasses += 'valid';
				}
				if (this.props.positions[i].white) {
					for (let j = 1; j <= this.props.positions[i].white; j++) {
						pieces.push(<Piece color='white'/>);
					}
				}
				if (this.props.positions[i].black) {
					for (let j = 1; j <= this.props.positions[i].black; j++) {
						pieces.push(<Piece color='black'/>);
					}
				}
				if (i === 1 || i === 28) {
					let container = <li className={homeClasses} key={i} onClick={this.selectSpace(i)}><Home pieces={pieces}/></li>;
				} else if (i === 8 || i === 21) {
					let container = <li className={barClasses} key={i} onClick={this.selectSpace(i)}><Bar pieces={pieces}/></li>;
				} else {
					let container = <li className={spaceClasses} key={i} onClick={this.selectSpace(i)}><Space pieces={pieces}/></li>;
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
});

const mapStateToProps = (state) => {
	return {
		state: state
	};
};

Board.propTypes = propTypes;
export const Board = connect(mapStateToProps)(Board);