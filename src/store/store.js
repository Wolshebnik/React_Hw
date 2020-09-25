import { createStore, applyMiddleware } from "redux";
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga';


import rootReducer from "./rootReducer";
import { rootSaga } from './rootSaga';

const logger = createLogger({
	duration: true,
	collapsed: true,
	colors: {
		title: () => '#139bfe',
		prevState: () => '#1c5faf',
		action: () => '#149945',
		nextState: () => '#a47104',
		error: () => '#ff0005',
	}
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	rootReducer,
	applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga)

export default store;