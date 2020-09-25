import { call, put } from 'redux-saga/effects';

import { startFetching, stopFetching } from '../../../ui/action';
import { toysGet } from '../../../../REST/fetchResource';
import { putToys } from '../../action';

export function* workerGetToys() {
	try {
		yield put( startFetching );
		const {data} = yield call( toysGet );
		yield put( putToys( data ) );
	}
	catch (e) {

	}
	finally {
		yield put( stopFetching );
	}
}