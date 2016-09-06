var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');
var Space = require('./space');
var Bar = require('./bar');
var Home = require('./home');
var Piece = require('./piece');


var Board = React.createClass({

	render: function() {
		var topBoard = [];
		var bottomBoard = [];
		for (var i = 1; i < 29; i++) {
			var pieces = [];
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
				var container = <Home pieces={pieces}/>;
			} else if (i === 8 || i === 21) {
				var container = <Bar pieces={pieces}/>;
			} else {
				var container = <Space pieces={pieces}/>;
			}
			if (i < 15) {
				topBoard.unshift(container);
			} else {
				bottomBoard.push(container);
			}
		}
		var topArr = topBoard.map(function(space, index) {
			return <li key={index}>{space}</li>;
		});
		var bottomArr = topBoard.map(function(space, index) {
			return <li key={index}>{space}</li>;
		})
		return (
			<div className="board">
				<ul className="board-top">{topArr}</ul>
				<ul className="board-bottom">{bottomArr}</ul>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		positions: state.positions
	};
};

module.exports = connect(mapStateToProps)(Board);