import Axios from 'axios';

export const getLocalStorage = () => {
	return localStorage.getItem('accessToken')||'';
};

const instance = Axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Authorization': 'Bearer ' + getLocalStorage(),
		'Content-Type': 'application/json'
	}

});

export const axios = async (method, resource, {id = '', body}) => {
	return instance[method](`/${resource}/${id}`, body);
};

