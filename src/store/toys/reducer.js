import { types } from './types';

const initialState = {
	list: []
};

export const toysReducer = ( state = initialState, action ) => {
	switch (action.type) {
		case types.PUT_TOYS:
			return {
				...state,
				list: action.payload.toys
			};

		default:
			return state;
	}
};