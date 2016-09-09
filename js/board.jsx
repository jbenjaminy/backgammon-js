var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');
var Space = require('./space');
var Bar = require('./bar');
var Home = require('./home');
var Piece = require('./piece');


var Board = React.createClass({
	selectSpace: function(id) {
		var props = this.props;
		return function() {
			if (props.highlight && props.validMoves) {
				props.validMoves.forEach(function(move) {
					if (move.position === id) {
						id = null;
						return props.dispatch(actions.updatePositions(move.position, props.highlight, move.roll));
					}
				});
			} else if ((!props.rolling && (props.positions[id][props.turn] > 0) && !props.positions[21][props.turn]) || id === 21 && props.positions[id][props.turn]) {
		    	var moves = props.availableMoves.join('_');
				props.dispatch(actions.findValidMoves(props.turn, id, moves));
				props.dispatch(actions.select(id));
			}
		}
	},
	render: function() {
		var topBoard = [];
		var bottomBoard = [];
		if (this.props.positions) {
			for (var i = 1; i < 29; i++) {
				var homeClasses = 'home ';
				var barClasses = 'bar ';
				var spaceClasses = 'space ';
				var pieces = [];
				if (i === this.props.highlight) {
					homeClasses += 'highlight';
					barClasses += 'highlight';
					spaceClasses += 'highlight';
				}
				if (this.props.positions[i].white) {
					for (var j = 1; j <= this.props.positions[i].white; j++) {
						pieces.push(<Piece color='white'/>);
					}
				}
				if (this.props.positions[i].black) {
					for (var j = 1; j <= this.props.positions[i].black; j++) {
						pieces.push(<Piece color='black'/>);
					}
				}
				if (i === 1 || i === 28) {
					var container = <li className={homeClasses} key={i} onClick={this.selectSpace(i)}><Home pieces={pieces}/></li>;
				} else if (i === 8 || i === 21) {
					var container = <li className={barClasses} key={i} onClick={this.selectSpace(i)}><Bar pieces={pieces}/></li>;
				} else {
					var container = <li className={spaceClasses} key={i} onClick={this.selectSpace(i)}><Space pieces={pieces}/></li>;
				}
				if (i < 15) {
					topBoard.unshift(container);
				} else {
					bottomBoard.push(container);
				}
			}	
		}
		return (
			<div className="board">
				<ul className="board-top">{topBoard}</ul>
				<ul className="board-bottom">{bottomBoard}</ul>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		positions: state.positions,
		highlight: state.highlight,
		rolling: state.rolling,
		turn: state.turn,
		validMoves: state.validMoves,
		availableMoves: state.availableMoves

	};
};

module.exports = connect(mapStateToProps)(Board);