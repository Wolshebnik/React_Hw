import {call, put } from 'redux-saga/effects';
import { startFetching, stopFetching } from '../../../ui/action';
import { putCategories } from '../../action';
import { categoriesGet } from '../../../../REST/fetchResource';

export function* workerGetCategories() {
	try {
		yield put( startFetching );
		const {data} = yield call (categoriesGet);
		console.log(data);
		yield put( putCategories( data ) );

	}
	catch (e) {

	}
	finally {
		yield put( stopFetching );
	}
}