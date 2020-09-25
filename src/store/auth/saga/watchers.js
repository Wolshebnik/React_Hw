import { all, call, takeEvery } from 'redux-saga/effects';

import { types } from '../types';
import { workerAuth, workerGetAuth } from './workers';

function* watcherGetAuth() {
	yield takeEvery( types.GET_LOGIN_ASYNC, workerGetAuth );
}

function* watcherPostAuth() {
	yield takeEvery( types.POST_LOGIN_ASYNC, workerAuth );
}

export function* watchersAllAuth() {
	yield all( [ call( watcherGetAuth ), call( watcherPostAuth ) ] );

}