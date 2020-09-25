import { types } from './types';

export const changeInputAction = ( input ) => ({
	type: types.CHANGE_INPUT,
	payload: input
});

export const getLoginAsync = ({
	type: types.GET_LOGIN_ASYNC
});

export const postLoginAsync = ( item ) => ({
	type: types.POST_LOGIN_ASYNC,
	payload: item
});

export const putToken = ( token ) => ({
	type: types.IS_TOKEN,
	payload: token
});

export const errorAuthenticate = ( error ) => ({
	type: types.ERROR_LOGIN_ASYNC,
	payload: error
});

export const logoutAuth = ({
	type: types.IS_LOGOUT,
});
