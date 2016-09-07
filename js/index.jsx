var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var actions = require('./actions');
var store = require('./store');
var GameContainer = require('./game-container');

document.addEventListener('DOMContentLoaded', function() {
	store.dispatch(actions.newGame());

  	ReactDOM.render(
    	<Provider store={store}>
      		<GameContainer />
    	</Provider>, document.getElementById('app'));
});