import { types } from './types';

const initialState = {
	toysList: []
};

export const toysReducer = ( state = initialState, action ) => {
	switch (action.type) {
		case types.PUT_TOYS:
			return {
				...state,
				toysList: action.payload.toys
			};

		default:
			return state;
	}
};