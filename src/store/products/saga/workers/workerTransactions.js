import { call, put } from 'redux-saga/effects';
import { errorsModal, openModal, startFetching, stopFetching } from '../../../ui/action';
import { transactionsGet, transactionsGetId, transactionsPost } from '../../../../REST/fetchResource';
import { putTransactions, putTransactionsId } from '../../action';

export function* workerGetTransactions() {
	try {
		yield put( startFetching );
		const {data} = yield call( transactionsGet );
		yield put( putTransactions( data) );
	}
	catch (e) {
		console.log( e );
		if(e.response) {
			yield put( openModal );
			yield put( errorsModal( {
				title: `Status: ${ e.response.status }`,
				text: e.response.data.message
			} ) );
		}
	}
	finally {
		yield put( stopFetching );
	}
}

export function* workerGetTransactionsId(action) {
	try {
		yield put( startFetching );
		const {data} = yield call( transactionsGetId, action.payload );
		yield put( putTransactionsId( data) );
	}
	catch (e) {
		console.log( e );
		if (e.response) {
			yield put( openModal );
			yield put( errorsModal( {
				title: `Status: ${ e.response.status }`,
				text: e.response.data.message
			} ) );
		}
	}
	finally {
		yield put( stopFetching );
	}
}

export function* workerPostTransactions(action) {
	try {

		const {data} = yield call( transactionsPost, action.payload );
		console.log(data);

	}
	catch (e) {
		console.log( e );
		if (e.response) {
			yield put( openModal );
			yield put( errorsModal( {
				title: `Status: ${ e.response.status }`,
				text: e.response.data.message
			} ) );
		}
	}
	finally {

	}
}