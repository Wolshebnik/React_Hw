import { all, call, takeEvery } from 'redux-saga/effects';

import { types } from '../types';
import {
	workerDeleteCategories,
	workerDeleteToys,
	workerGetCategories,
	workerGetToys,
	workerGetToysAndTransactions,
	workerGetTransactions,
	workerGetTransactionsId,
	workerPostCategories,
	workerPostToys,
	workerPostTransactions,
	workerPutCategories,
	workerUpdateToys
} from './workers';

//Toys
function* watcherGetToysAndTransActions() {
	yield takeEvery( types.GET_TOYS_TRANSACTIONS_ASYNC, workerGetToysAndTransactions );
}

function* watcherGetToys() {
	yield takeEvery( types.GET_TOYS_ASYNC, workerGetToys );
}

function* watcherPostToy() {
	yield takeEvery( types.POST_TOYS_ASYNC, workerPostToys );
}

function* watcherDeleteToy() {
	yield takeEvery( types.DELETE_TOY_ASYNC, workerDeleteToys );
}

function* watcherUpdateToy() {
	yield takeEvery( types.UPDATE_TOY_ASYNC, workerUpdateToys );
}

//Categories

function* watcherGetCategories() {
	yield takeEvery( types.GET_CATEGORIES_ASYNC, workerGetCategories );
}

function* watcherPostCategories() {
	yield takeEvery( types.POST_CATEGORY_ASYNC, workerPostCategories );
}

function* watcherDeleteCategories() {
	yield takeEvery( types.DELETE_CATEGORY_ASYNC, workerDeleteCategories );
}

function* watcherPutCategories() {
	yield takeEvery( types.UPDATE_CATEGORY_ASYNC, workerPutCategories );
}

//transactions

function* watcherGetTransactions() {
	yield takeEvery( types.GET_TRANSACTIONS_ASYNC, workerGetTransactions );
}

function* watcherGetTransactionsId() {
	yield takeEvery( types.GET_TRANSACTIONS_ID_ASYNC, workerGetTransactionsId );
}

function* watcherPostTransactions() {
	yield takeEvery( types.POST_TRANSACTIONS_ASYNC, workerPostTransactions );
}

export function* watcherProducts() {
	yield all( [ call( watcherGetToys ), call( watcherGetToysAndTransActions ), call( watcherPostToy ), call( watcherDeleteToy ), call( watcherUpdateToy ), call( watcherGetCategories ), call( watcherGetTransactions ), call( watcherPostTransactions ), call( watcherPostCategories ), call( watcherDeleteCategories ), call( watcherPutCategories ), call( watcherGetTransactionsId ) ] );

}