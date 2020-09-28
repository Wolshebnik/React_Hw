import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Incoming from './pages/Incoming';
import OutComing from './pages/Outcoming';

const App = () => {
	const {isAuthenticated} = useSelector( state => state.auth );
	
	return isAuthenticated ? (
		<Switch>
			<Route path='/dashboard' component={ Dashboard }/>
			<Route path='/incoming/:id' component={ Incoming}/>
			<Route path='/outcoming/:id' component={ OutComing}/>
			<Redirect to={ '/dashboard' }/>
		</Switch>
	) : (
		<Switch>
			<Route path='/' component={ Login } exact/>
			<Redirect to={ '/' }/>
		</Switch>
	);
};

export default App;
