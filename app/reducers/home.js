import { HomeActions } from '../actions/home';

const initialState = {
	hovered: '',
	href: ''
};

function home(state = initialState, action) {
	switch (action.type) {
		case HomeActions.HOVERED_ON_CHANGED:
			return {
				...state,
				hovered: action.hovered
			};
		case HomeActions.HREF_ON_CHANGED:
			return {
				...state,
				href: action.href
			};
		case HomeActions.RESET:
			return initialState;
		default:
			return state;
	}
}

export default home;
