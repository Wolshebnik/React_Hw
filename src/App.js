import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';

const App = () => {
	const {isAuthenticated} = useSelector( state => state.auth );

	console.log(isAuthenticated);

	return isAuthenticated ? (
		<Switch>
			<Route path='/dashboard' component={ Dashboard }/>
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
