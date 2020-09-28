import { combineReducers } from 'redux';

import { authReducer as auth } from './auth/reducer';
import { uiReducer as ui } from './ui/reducer';
import { toysReducer as toys } from './toys/reducer';
import { transactionsReducer as transactions } from './transactions/reducer';
import { categoriesReducer as categories } from './categories/reducer';

const rootReducer = combineReducers( {
	auth,
	ui,
	toys,
	transactions,
	categories
} );

export default rootReducer;