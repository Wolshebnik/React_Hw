import { call, put } from 'redux-saga/effects';
import { startFetching, stopFetching } from '../../../ui/action';
import { transactionsGet } from '../../../../REST/fetchResource';
import { putTransactions } from '../../action';

export function* workerGetTransactions() {
	try {
		yield put( startFetching );
		const {data} = yield call( transactionsGet );
		yield put(putTransactions(data))
		console.log( data );
	}
	catch (e) {

	}
	finally {
		yield put( stopFetching );
	}
}