import { HomeActions } from '../actions/home';

const initialState = {
	hovered: '',
	href: ''
};

function home(state = initialState, action) {
	switch (action.type) {
		case HomeActions.hoveredOnChanged:
			return {
				...state,
				hovered: action.hovered
			};
		case HomeActions.hrefOnChanged:
			return {
				...state,
				href: action.href
			};
		default:
			return state;
	}
}

export default home;
