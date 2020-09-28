import { all, call } from 'redux-saga/effects';

import { watchersAllAuth } from './auth/saga/watchers';
import { watcherAllToys } from './toys/saga/watchers';
import { watcherAllTransactions } from './transactions/saga/watchers';
import { watcherAllCategories } from './categories/saga/watchers';

export function* rootSaga() {
	yield all( [ call( watchersAllAuth ), call( watcherAllToys ), call( watcherAllTransactions ), call( watcherAllCategories ) ] );
}