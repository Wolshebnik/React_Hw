import { call, put } from 'redux-saga/effects';
import { startFetching, stopFetching } from '../../../ui/action';

export function* worker() {
	try{
		yield put( startFetching );
	}catch (e) {

	}finally {
		yield put( stopFetching );
	}
}