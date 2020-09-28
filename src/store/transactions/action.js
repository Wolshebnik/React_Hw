import { types } from './types';

export const getTransactions = ({
	type: types.GET_TRANSACTIONS
});

export const putTransactions = (transactions) => ({
	type: 'PUT_TRANSACTIONS',
	payload: transactions
})