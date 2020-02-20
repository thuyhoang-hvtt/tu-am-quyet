import { PlayerActions } from '../actions/player';

const initialState = {
	isPlaying: false,
	isPausing: false,
	isOpened: false,
	isExpanded: false,
	content: {},
	info: {}
};

export default function player(state = initialState, action) {
	switch (action.type) {
		case PlayerActions.OPEN:
			return {
				...state,
				isOpened: true,
				isExpanded: action.isExpanded
			};
		case PlayerActions.CLOSE:
			return {
				...state,
				isOpened: false
			};
		case PlayerActions.ADD_CONTENT:
			return {
				...state,
				content: action.content,
				isPausing: false,
				isPlaying: false
			};
		case PlayerActions.ADD_INFO:
			return {
				...state,
				info: action.info
			};
		case PlayerActions.PLAY:
			return {
				...state,
				isPlaying: true
			};
		case PlayerActions.PAUSE:
			return {
				...state,
				isPausing: true
			};
		case PlayerActions.RESUME:
			return {
				...state,
				isPausing: false
			};
		case PlayerActions.STOP:
			return {
				...state,
				isPlaying: false
			};
		case PlayerActions.RESET:
			return initialState;
		default:
			return state;
	}
}
