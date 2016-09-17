var React = require('react');

var Piece = React.createClass({

  render: function() {
  	var pieceSrc = './white-piece.png';
  	var pieceClasses = 'piece white';
  	if (this.props.color === 'black') {
			pieceSrc = './black-piece.png';
			pieceClasses = 'piece black';
		};
    return(
    	<img className={pieceClasses} src={pieceSrc} />
    );
  }
});

module.exports = Piece;
