import { axios } from './networkProvider';

// Auth
export const loginGet = () => {
	return axios( 'get', 'profile', {} );
};
export const loginPost = ( body ) => {
	return axios( 'post', 'login', {body} );
};

//Toy
export const toysGet = () => {
	return axios( 'get', 'toys', {} );
};
export const toysPost = ( body ) => {
	return axios( 'post', 'toys', {body} );
};
export const toysDelete = ( id ) => {
	return axios( 'delete', 'toys', {id} );
};
export const toysUpdate = ( {id, body} ) => {
	return axios( 'put', 'toys', {id, body} );
};

// Category
export const categoriesGet = () => {
	return axios( 'get', 'categories', {} );
};
export const categoriesPost = ( body ) => {
	return axios( 'post', 'categories', {body} );
};
export const categoriesDelete = ( id ) => {
	return axios( 'delete', 'categories', {id} );
};
export const categoriesPut = ( {id, name} ) => {
	return axios( 'put', 'categories', {id, body: {name}} );
};

//Transaction
export const transactionsGet = () => {
	return axios( 'get', 'transactions', {} );
};

export const transactionsGetId = ( id ) => {
	return axios( 'get', 'transactions', {id} );
};
export const transactionsPost = ( body ) => {
	return axios( 'post', 'transactions', {body} );
};

