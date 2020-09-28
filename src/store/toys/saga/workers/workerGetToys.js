import { all, call, put } from 'redux-saga/effects';

import { startFetching, stopFetching } from '../../../ui/action';
import { toysGet, transactionsGet } from '../../../../REST/fetchResource';
import { putToys } from '../../action';
import { putTransactions } from '../../../transactions/action';
import { logoutAuth } from '../../../auth/action';

export function* workerGetToys() {
	try {
		yield put( startFetching );
		const [ toys, transactions ] = yield all( [ call( toysGet ), call( transactionsGet ) ] );
		yield put( putToys( toys.data ) );
		yield put( putTransactions( transactions.data ) );
		console.log( toys.data );
		console.log( transactions.data );
	}
	catch (e) {
		if (e.response) {
			console.log( e.response.message );
		} else {
			yield put( logoutAuth );
		}

	}
	finally {
		yield put( stopFetching );
	}
}