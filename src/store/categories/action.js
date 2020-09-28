import { types } from './types';

export const getCategories = ({
	type: types.GET_CATEGORIES_ASYNC
});

export const putCategories = (category) =>({
	type: types.PUT_CATEGORIES,
	payload: category
});