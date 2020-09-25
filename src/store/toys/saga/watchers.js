import { all, call, takeEvery } from 'redux-saga/effects';

import { types } from '../types';
import { workerGetToys } from './workers';

function* watcherGetToys() {
	yield takeEvery( types.GET_TOYS_ASYNC, workerGetToys );
}

export function* watcherAllToys() {
	yield all( [ call( watcherGetToys ) ] );

}