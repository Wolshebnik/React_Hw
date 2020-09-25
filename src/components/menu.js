import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppBar, Box, Button } from '@material-ui/core/';

import { logoutAuth } from '../store/auth/action';

const MyAppBar = styled(AppBar)`
background-color: #9fa8da;
`;

export const Menu = () => {
	const dispatch = useDispatch();
	const logout = () => {
		dispatch( logoutAuth );
	};

	return (
		<MyAppBar position="static">
			<Box display="flex" justifyContent="flex-end" height={ 50 }>
				<Box mt={ 1 } >
					<Button variant="outlined"
						color="secondary"
						onClick={ logout }
					>Logout</Button>
				</Box>
			</Box>
		</MyAppBar>
	);
};