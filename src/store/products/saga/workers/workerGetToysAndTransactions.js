import { all, call, put } from 'redux-saga/effects';

import { errorsModal, openModal, startFetching, stopFetching } from '../../../ui/action';
import { toysGet, transactionsGet } from '../../../../REST/fetchResource';
import { putToys } from '../../action';
import { putTransactions } from '../../action';
import { logoutAuth } from '../../../auth/action';

export function* workerGetToysAndTransactions() {
	try {
		yield put( startFetching );
		const [ toys, transactions ] = yield all( [ call( toysGet ), call( transactionsGet ) ] );
		yield put( putToys( toys.data) );
		yield put( putTransactions( transactions.data) );
	}
	catch (e) {
		if (e.response) {
			console.log( e.response.message );
			if(e.response) {
				yield put( openModal );
				yield put( errorsModal( {
					title: `Status: ${ e.response.status }`,
					text: e.response.data.message
				} ) );
			}
		} else {
			yield put( logoutAuth );
		}

	}
	finally {
		yield put( stopFetching );
	}
}