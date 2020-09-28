import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button, Container, FormLabel, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { changeInputAction, postLoginAsync } from '../store/auth/action';
import LinearBuffer from '../components/LinearBuffer';
import { getCategories } from '../store/categories/action';


const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	input:{
		marginBottom: '20px'
	},
	button: {
		height:'56px'
	},
	progress: {
		margin: '20px'
	}
}));

const Form = styled( 'form' )`
	display: flex;
	flex-direction: column;
	margin: 50px;
	padding: 30px;
	border: 2px solid rgba(0, 0, 0, 0.87);
	border-radius: 10px;
`;

const MyFormLabel = styled( FormLabel )`
margin-bottom: 20px;
`;

const Incoming = () => {
	const dispatch = useDispatch();
	const {categoriesList} = useSelector( state => state.categories );
	const {isFetching} = useSelector( state => state.ui );
	console.log(categoriesList);

	const classes = useStyles();

	const onSubmit = ( e ) => {
		e.preventDefault();

	};

	const changeInput = ( e ) => {
		// dispatch( changeInputAction( {[e.target.id]: e.target.value} ) );
		dispatch( getCategories );
	};

	return (
		<Container maxWidth='sm'>
			<Form onSubmit={ onSubmit }>
				Hi
				{/*<MyFormLabel align={ 'center' }>Login</MyFormLabel>*/}
				{/*<TextField*/}
				{/*	className={classes.input}*/}
				{/*	id="email"*/}
				{/*	label="Email"*/}
				{/*	placeholder={ 'user@example.com' }*/}
				{/*	type='email'*/}
				{/*	variant="outlined"*/}
				{/*	value={ email }*/}
				{/*	error={ Boolean( error ) }*/}
				{/*	helperText={ error }*/}
				{/*	onChange={ changeInput }*/}
				{/*/>*/}
				{/*<TextField*/}
				{/*	className={classes.input}*/}
				{/*	id="password"*/}
				{/*	label="Password"*/}
				{/*	placeholder={ '1234567890' }*/}
				{/*	type='password'*/}
				{/*	variant="outlined"*/}
				{/*	value={ password }*/}
				{/*	onChange={ changeInput }*/}
				{/*/>*/}
					<Button
						className={classes.button}
						variant="outlined"
						color="primary"
						type={ 'submit' }
					onClick={changeInput}
					>
				{ isFetching ? <LinearBuffer/> : 'LOGIN IN' }</Button>
			</Form>
		</Container>
	);
};
export default Incoming;