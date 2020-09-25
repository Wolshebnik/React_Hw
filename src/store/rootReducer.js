import { combineReducers } from 'redux';

import { authReducer as auth } from './auth/reducer';
import { uiReducer as ui } from './ui/reducer';
import { toysReducer as toys } from './toys/reducer';

const rootReducer = combineReducers( {
	auth,
	ui,
	toys
} );

export default rootReducer;