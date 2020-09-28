import { types } from './types';

const initialState = {
	transactionsList: []
};

export const transactionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.PUT_TRANSACTIONS:
			return {
				...state,
				transactionsList: action.payload.transactions
			};

		default:
			return state;
	}
};