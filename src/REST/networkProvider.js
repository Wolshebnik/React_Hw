import axios from 'axios';

const getLocalStorage = () => {
	return localStorage.getItem('accessToken')||'';
};

const instance = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Authorization': 'Bearer ' + getLocalStorage(),
		'Content-Type': 'application/json'
	}

});

export const axiosInstance = async (method, resource, {id = '', body}) => {
	return instance[method](`/${resource}/${id}`, body);
};

