// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';
import home from './home';
import ajax from './ajax';
import player from './player';

export default function createRootReducer(history: HashHistory) {
	return combineReducers({
		router: connectRouter(history),
		home,
		ajax,
		player
	});
}
