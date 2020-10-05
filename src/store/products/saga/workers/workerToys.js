import { call, put } from 'redux-saga/effects';
import { errorsModal, openModal, startFetching, stopFetching } from '../../../ui/action';
import { deleteToySync, putToy, putToys, updateToySync } from '../../action';
import { toysDelete, toysGet, toysPost, toysUpdate } from '../../../../REST/fetchResource';

export function* workerGetToys() {
	try {
		yield put( startFetching );
		const {data} = yield  call( toysGet );
		yield put( putToys( data ) );
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

export function* workerPostToys( action ) {

	try {
		const {data} = yield call( toysPost, action.payload );
		yield put( putToy( data ) );
	}
	catch (e) {
		console.log( e );
		if(e.response) {
			console.log(e.response)
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

export function* workerDeleteToys( action ) {

	try {
		const {data} =yield  call( toysDelete, action.payload );
		yield put( deleteToySync( data.id ) );

	}
	catch (e) {
		console.log(e);
		if(e.response) {
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

export function* workerUpdateToys( action ) {
	try {
		const {data} = yield  call( toysUpdate, action.payload );
		yield put( updateToySync( data) );

	}
	catch (e) {
		console.log(e);
		if(e.response) {
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
