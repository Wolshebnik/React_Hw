import { all, call, takeEvery } from 'redux-saga/effects';

import { types } from '../types';
import { workerGetTransactions } from './workers';

function* watchGetTransactions() {
	yield takeEvery( types.GET_TRANSACTIONS, workerGetTransactions );
}

export function* watcherAllTransactions() {
	yield all( [ call( watchGetTransactions ) ] );

}