import { call, put } from 'redux-saga/effects';
import { errorsModal, openModal, startFetching, stopFetching } from '../../../ui/action';
import { addCategories, deleteCategoriesSync, putCategories, updateCategory } from '../../action';
import { categoriesDelete, categoriesGet, categoriesPost, categoriesPut } from '../../../../REST/fetchResource';

export function* workerGetCategories() {
	try {
		yield put( startFetching );
		const {data} = yield  call( categoriesGet );
		yield put( putCategories( data.categories ) );
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

export function* workerDeleteCategories( action ) {
	const id = action.payload;
	try {
		yield  call( categoriesDelete, id );
		yield put( deleteCategoriesSync( id ) );

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
export function* workerPostCategories( action ) {
	const body = action.payload;

	try {
		const {data} = yield call( categoriesPost, body );
		yield put( addCategories( data ) );
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
	}
}

export function* workerPutCategories( action ) {
	const item = action.payload;

	try {
		const {data} = yield  call( categoriesPut, item );
		console.log(data);
		yield put(updateCategory(data))

	}
	catch (e) {
		console.log( e);
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