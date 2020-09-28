import { axios } from './networkProvider';

export const loginGet = () => {
	return axios('get', 'profile', {});
};
export const loginPost = (body) => {
	return axios('post', 'login', {body});
};

export const toysGet = () => {
	return axios('get', 'toys', {});
};

export const transactionsGet = () => {
	return axios('get', 'transactions', {});
};

export const categoriesGet = () => {
	return axios('get', 'categories', {});
};
