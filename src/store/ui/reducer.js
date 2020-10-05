import { types } from './types';

const initialState = {
	isFetching: false,
	modal: false,
	errorModal: {
		title: '',
		text: ''
	}

};

export const uiReducer = ( state = initialState, action ) => {
	switch (action.type) {
		case types.START_FETCHING:
			return {
				...state,
				isFetching: true
			};

		case types.STOP_FETCHING:
			return {
				...state,
				isFetching: false
			};

		case types.MODAL_OPEN:
			return {
				...state,
				modal: true
			};

		case types.MODAL_CLOSE:
			return {
				...state,
				modal: false,
				errorModal: {
					title: '',
					text: ''
				}
			};

		case types.MODAL_ERROR:
			return {
				...state,
				errorModal: action.payload,

			};
		default:
			return state;
	}
};