import { types } from './types';

export const startFetching = ({
	type: types.START_FETCHING
});
export const stopFetching = ({
	type: types.STOP_FETCHING
});

export const openModal = ({
	type: types.MODAL_OPEN
});

export const closeModal = ({
	type: types.MODAL_CLOSE
});

export const errorsModal = ( error ) => ({
	type: types.MODAL_ERROR,
	payload: error
});

export const permissionToMove = ( toMove ) => ({
	type: types.PERMISSION_TO_MOVE,
	payload: toMove
});