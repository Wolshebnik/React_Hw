import { all, call } from 'redux-saga/effects';

import { watchersAllAuth } from './auth/saga/watchers';
import { watcherProducts } from './products/saga/watchers';

export function* rootSaga() {
	yield all( [ call( watchersAllAuth ), call( watcherProducts ) ] );
}