import { combineReducers } from 'redux';

import { authReducer as auth } from './auth/reducer';
import { uiReducer as ui } from './ui/reducer';
import { productsReducer as products } from './products/reducer';


const rootReducer = combineReducers( {
	auth,
	ui,
	products
} );

export default rootReducer;