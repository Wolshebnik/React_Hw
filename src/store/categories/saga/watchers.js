import { all, call, takeEvery } from 'redux-saga/effects';

import { types } from '../types';
import { workerGetCategories } from './workers';

function* watchGetCategories() {
	yield takeEvery( types.GET_CATEGORIES_ASYNC, workerGetCategories );
}

export function* watcherAllCategories() {
	yield all( [ call( watchGetCategories ) ] );

}