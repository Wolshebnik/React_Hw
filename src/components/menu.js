import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled } from '@material-ui/core/styles';

import { AppBar, Box, Button } from '@material-ui/core/';

import { logoutAuth } from '../store/auth/action';

const MyButton = styled( ( {color, ...other} ) => <Button { ...other } /> )( {
	background: ( props ) =>
		props.color === 'red'
			? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
			: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
	border: 0,
	borderRadius: 3,
	boxShadow: ( props ) =>
		props.color === 'red'
			? '0 3px 5px 2px rgba(255, 105, 135, .3)'
			: '0 3px 5px 2px rgba(33, 203, 243, .3)',
	color: 'white',
	height: 25,
	padding: '0 30px',
	margin: 8
} );

export const Menu = ( ) => {
	let history = useHistory();
	let location = useLocation();
	const dispatch = useDispatch();
	const categoryButtonVisible = location.pathname === '/categories';
	const toysButtonVisible = location.pathname === '/toys';
	const dashboardButtonVisible = location.pathname === '/dashboard';
	const addTransactionButtonVisible = location.pathname === '/add_transaction';

	const logout = () => {
		dispatch( logoutAuth );
	};

	const moveTo = ( link ) => {
		history.push( `/${ link }` );
	};

	return (

		<AppBar position="static">
			<Box display="flex" justifyContent="space-around" height={ 50 }>

				{ !dashboardButtonVisible && (<Box mt={ 1 }>
					<MyButton variant="outlined"
						color={ 'red' }
						onClick={ () => moveTo( 'dashboard' ) }
					>Dashboard</MyButton>
				</Box>) }
				{ !categoryButtonVisible && (<Box mt={ 1 }>
					<MyButton variant="outlined"
						color={ 'red' }
						onClick={ () => moveTo( 'categories' ) }
					>Categories</MyButton>
				</Box>) }
				{ !toysButtonVisible && (<Box mt={ 1 }>
					<MyButton variant="outlined"
						color={ 'red' }
						onClick={ () => moveTo( 'toys' ) }
					>Toys</MyButton>
				</Box>) }
				{ !addTransactionButtonVisible && (<Box mt={ 1 }>
					<MyButton variant="outlined"
						color={ 'red' }
						onClick={ () => moveTo( 'add_transaction' ) }
					>Add transaction</MyButton>
				</Box>) }


				<Box mt={ 1 }>
					<MyButton variant="outlined"
						color={ 'blue' }
						onClick={ logout }
					>Logout</MyButton>
				</Box>
			</Box>
		</AppBar>

	);
};