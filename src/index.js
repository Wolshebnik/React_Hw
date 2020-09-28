import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import store from './store/store';
import App from './App';
import { Menu } from './components/menu';

console.log('store', store.getState());
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Menu/>
			<App/>
		</Router>
	</Provider>,
	document.getElementById('root')
);
