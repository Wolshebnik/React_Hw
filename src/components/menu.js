import React from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Box, Button } from '@material-ui/core/';

import { logoutAuth } from '../store/auth/action';

export const Menu = () => {
	const dispatch = useDispatch();
	const logout = () => {
		dispatch( logoutAuth );
	};

	return (
		<AppBar position="static">
			<Box display="flex" justifyContent="flex-end" height={ 50 }>
				<Box mt={ 1 } >
					<Button variant="outlined"
						color="secondary"
						onClick={ logout }
					>Logout</Button>
				</Box>
			</Box>
		</AppBar>
	);
};