import { types } from './types';

const initialState = {
	categoriesList:[]
};

export const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.PUT_CATEGORIES:
			return {
				...state,
			categoriesList: action.payload.categories
			};

		default:
			return state;
	}
};