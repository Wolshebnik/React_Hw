import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button, Container, FormLabel, LinearProgress,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { changeInputAction, postLoginAsync } from '../store/auth/action';

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

const Login = () => {
	const dispatch = useDispatch();
	const {email, password, error} = useSelector( state => state.auth );
	const {isFetching} = useSelector( state => state.ui );

	const classes = useStyles();

	const onSubmit = ( e ) => {
		e.preventDefault();
		dispatch( postLoginAsync( {email, password} ) );
	};

	const changeInput = ( e ) => {
		dispatch( changeInputAction( {[e.target.id]: e.target.value} ) );
		console.log( e.target.value );
	};

	return (
		<Container maxWidth='sm'>
			<Form onSubmit={ onSubmit }>
				<MyFormLabel align={ 'center' }>Login</MyFormLabel>
				<TextField
					className={classes.input}
					id="email"
					label="Email"
					placeholder={ 'user@example.com' }
					type='email'
					variant="outlined"
					value={ email }
					error={ Boolean( error ) }
					helperText={ error }
					onChange={ changeInput }
				/>
				<TextField
					className={classes.input}
					id="password"
					label="Password"
					placeholder={ '1234567890' }
					type='password'
					variant="outlined"
					value={ password }
					onChange={ changeInput }
				/>
				{ isFetching ? <LinearProgress className={classes.progress} color="primary"/> :
					<Button
						className={classes.button}
						variant="outlined"
						color="primary"
						type={ 'submit' }
					>SING IN</Button> }
			</Form>
		</Container>
	);
};
export default Login;