var React = require('react');
var Piece = require('./piece');

var Home = React.createClass({
	 render: function() {
	  	  	var piecesArr = this.props.pieces.map(function(piece, index) {
				return <li key={index}>{piece}</li>;
			});
	    return <ul className='home'>{this.props.pieces}</ul>;
  	}
});

module.exports = Home;
