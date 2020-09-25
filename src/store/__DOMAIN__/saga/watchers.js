import {takeEvery, all, call} from 'redux-saga/effects';

import {types} from '../types';
import {worker} from './workers';

function * watchWorker() {
	yield takeEvery(types.TYPE, worker)
}


export function * watcherAll() {
	yield all([call(watchWorker)])

}