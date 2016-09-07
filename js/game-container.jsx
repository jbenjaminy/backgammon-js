var React = require('react');
var TopDisplay = require('./top-display');
var Board = require('./board');

var GameContainer = React.createClass({
	 render: function() {
	    return (
	    	<div className='game-container'>
		    	<TopDisplay />
		    	<Board />
		    </div>
	    );
  	}
});

module.exports = GameContainer;