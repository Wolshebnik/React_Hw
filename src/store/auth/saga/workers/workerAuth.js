import { call, put } from 'redux-saga/effects';

import { startFetching, stopFetching } from '../../../ui/action';
import { errorAuthenticate, logoutAuth, putToken } from '../../action';
import { loginGet, loginPost } from '../../../../REST/fetchResource';

export function* workerAuth( action ) {
	const body = action.payload;
	try {
		yield put( startFetching );
		const {data} = yield call( loginPost, body );
		yield put( putToken( data.accessToken ) );
	}
	catch (e) {
		console.log( e.response );
		yield put( errorAuthenticate( e.response.data.message ) );
		yield put(logoutAuth)
	}
	finally {
		yield put( stopFetching );
	}
}

export function* workerGetAuth() {
	try {
		yield put( startFetching );
		const {data} = yield call( loginGet );
		console.log( data );
	}
	catch (e) {
		console.log( e );
	}
	finally {
		yield put( stopFetching );
	}
}