import { axiosInstance } from './networkProvider';

export const loginGet = () => {
	return axiosInstance('get', 'profile', {});
};
export const loginPost = (body) => {
	return axiosInstance('post', 'login', {body});
};

export const toysGet = () => {
	return axiosInstance('get', 'toys', {});
};

