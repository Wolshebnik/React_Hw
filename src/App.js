import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import { Menu } from './components/menu';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Categories from './pages/Categories';
import Toys from './pages/Toys';
import Transaction from './pages/Transactions';
import AddTransaction from './pages/AddTransactions';

const App = () => {
	const {isAuthenticated} = useSelector( state => state.auth );
	
	return isAuthenticated ? (
		<>
			<Menu/>
		<Switch>
			<Route path='/categories' component={ Categories }/>
			<Route path='/toys' component={ Toys }/>
			<Route path='/dashboard' component={ Dashboard }/>
			<Route path='/transaction/:id' component={ Transaction}/>
			<Route path='/add_transaction/' component={ AddTransaction}/>
			<Redirect to={ '/dashboard' }/>
		</Switch>
			</>
	) : (
		<Switch>
			<Route path='/' component={ Login } exact/>
			<Redirect to={ '/' }/>
		</Switch>
	);
};

export default App;
