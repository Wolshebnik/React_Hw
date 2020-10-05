import { types } from './types';

//Toys
export const getToysAndTransactionsAsync = ({
	type: types.GET_TOYS_TRANSACTIONS_ASYNC
});

export const getToys = ({
	type: types.GET_TOYS_ASYNC
});
export const deleteToysAsync = ( id ) => ({
	type: types.DELETE_TOY_ASYNC,
	payload: id
});

export const postToys = ( toy ) => ({
	type: types.POST_TOYS_ASYNC,
	payload: toy
});

export const updateToyAsync = ( toy ) => ({
	type: types.UPDATE_TOY_ASYNC,
	payload: toy
});

export const putToys = ( toys ) => ({
	type: types.PUT_TOYS,
	payload: toys
});

export const putToy = ( toy ) => ({
	type: types.PUT_TOY,
	payload: toy
});

export const deleteToySync = ( id ) => ({
	type: types.DELETE_TOY,
	payload: id
});

export const updateToySync = ( toy ) => ({
	type: types.UPDATE_TOY,
	payload: toy
});

//Categories

export const getCategories = ({
	type: types.GET_CATEGORIES_ASYNC
});

export const postCategories = ( item ) => ({
	type: types.POST_CATEGORY_ASYNC,
	payload: item
});

export const putCategories = ( category ) => ({
	type: types.PUT_CATEGORIES,
	payload: category
});

export const addCategories = ( category ) => ({
	type: types.ADD_CATEGORY,
	payload: category
});

export const deleteCategoriesAsync = ( id ) => ({
	type: types.DELETE_CATEGORY_ASYNC,
	payload: id
});

export const deleteCategoriesSync = ( id ) => ({
	type: types.DELETE_CATEGORY,
	payload: id
});

export const updateCategory = ( item ) => ({
	type: types.UPDATE_CATEGORY,
	payload: item
});

export const updateCategoryAsync = ( item ) => ({
	type: types.UPDATE_CATEGORY_ASYNC,
	payload: item
});

export const getCategoriesAndToys = ({
	type: types.GET_CATEGORIES_AND_TOYS
});

//Transactions
export const getTransactions = ({
	type: types.GET_TRANSACTIONS_ASYNC
});

export const getTransactionsId = ( id ) => ({
	type: types.GET_TRANSACTIONS_ID_ASYNC,
	payload: id
});
export const postTransactions = ( body ) => ({
	type: types.POST_TRANSACTIONS_ASYNC,
	payload: body
});

export const putTransactions = ( transactions ) => ({
	type: types.PUT_TRANSACTIONS,
	payload: transactions
});

export const putTransactionsId = ( transaction ) => ({
	type: types.PUT_TRANSACTIONS_ID,
	payload: transaction
});