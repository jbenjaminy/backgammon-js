import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import LandingPage from './components/landing-page';
import NewGame from './components/new-game';
import JoinGame from './components/join-game';
import ResumeGame from './components/resume-game';
import GameContainer from './components/game-container';

let App = (props) => {
  return (
    <div className='app'>
        {props.children}
    </div>
  )
}

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={LandingPage} />
			<Route path='/new' component={NewGame} />
			<Route path='/join' component={JoinGame} />
			<Route path='/resume' component={ResumeGame} />
			<Route path='/game/:gameId'>
				<IndexRoute component={GameContainer} />
			</Route>
		</Route>
	</Router>
);

module.exports = routes;



