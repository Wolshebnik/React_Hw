import { types } from './types';

export const getToysAsync = ({
	type: types.GET_TOYS_ASYNC
});

export const putToys = (toys) => ({
	type: types.PUT_TOYS,
	payload: toys
})