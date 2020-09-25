import { types } from './types';

const initialState = {
	email: 'user@example.com',
	password: '1234567890',
	isAuthenticated: '',
	error: null
};

export const authReducer = ( state = initialState, action ) => {
	switch (action.type) {
		case types.CHANGE_INPUT:
			return {
				...state,
				...action.payload
			};
		case types.IS_TOKEN:
			localStorage.setItem( 'accessToken', action.payload );
			return {
				...state,
				isAuthenticated: action.payload
			};
		case types.ERROR_LOGIN_ASYNC:
			return {
				...state,
				error: action.payload
			};

		case types.IS_LOGOUT:
			delete localStorage.accessToken;
			return {
				...state,
				isAuthenticated:''
			};

		default:
			return state;
	}
};