var React = require('react');
var Piece = require('./piece');

var Bar = React.createClass({
	render: function() {
	  	var piecesArr = this.props.pieces.map(function(piece, index) {
			return <li key={index}>{piece}</li>;
		});
	    return <ul className='bar'>{piecesArr}</ul>;
	}
});

module.exports = Bar;
