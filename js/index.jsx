var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var actions = require('./actions');
var store = require('./store');
var Board = require('./board');

document.addEventListener('DOMContentLoaded', function() {
	store.dispatch(actions.newGame());

  	ReactDOM.render(
    	<Provider store={store}>
      		<Board />
    	</Provider>, document.getElementById('app'));
});