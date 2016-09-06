var React = require('react');
var Piece = require('./piece');

var Space = React.createClass({
  	render: function() {
  		var piecesArr = this.props.pieces.map(function(piece, index) {
			return <li key={index}>{piece}</li>;
		});
    	return <ul className='space'>{piecesArr}</ul>;
  	}
});

module.exports = Space;