// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';
import home from './home';

export default function createRootReducer(history: HashHistory) {
	return combineReducers({
		router: connectRouter(history),
		home
	});
}
