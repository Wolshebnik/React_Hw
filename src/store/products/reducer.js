import { types } from './types';
import { deleteFilter, updateItems } from '../../Utilities';

const initialState = {
	toysList: [],
	categoriesList: [],
	transactionsList: [],
	transaction: {toys:[],type:''}
};

export const productsReducer = ( state = initialState, action ) => {
	switch (action.type) {

		//toys
		case types.PUT_TOYS:
			return {
				...state,
				toysList: action.payload.toys
			};

		case types.PUT_TOY:
			return {
				...state,
				toysList:[...state.toysList, action.payload]
			};

		case types.DELETE_TOY:
			return {
				...state,
				toysList: deleteFilter(state.toysList, action.payload)
			};

		case types.UPDATE_TOY:
			return {
				...state,
				toysList: updateItems(state.toysList, action.payload)
			};

		//categories
		case types.PUT_CATEGORIES:
			return {
				...state,
				categoriesList: action.payload
			};

		case types.ADD_CATEGORY:

			return {
				...state,
				categoriesList: [...state.categoriesList, action.payload]
			};

		case types.DELETE_CATEGORY:
			return {
				...state,
				categoriesList: deleteFilter(state.categoriesList, action.payload)
			};

		case types.UPDATE_CATEGORY:
			return {
				...state,
				categoriesList: updateItems(state.categoriesList, action.payload)
			};

		//transactions
		case types.PUT_TRANSACTIONS:
			return {
				...state,
				transactionsList: action.payload.transactions
			};

			case types.PUT_TRANSACTIONS_ID:
			return {
				...state,
				transaction: action.payload
			};

		default:
			return state;
	}
};