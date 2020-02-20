import { AjaxActions } from '../actions/ajax';

const initialState = {
	loading: false,
	error: ''
};

export default function error(state = initialState, action) {
	switch (action.type) {
		case AjaxActions.WARNING:
			return {
				...state,
				error: action.error
			};
		case AjaxActions.LOADING:
			return {
				...state,
				loading: action.loading
			};
		case AjaxActions.RESET:
			return initialState;
		default:
			return state;
	}
}
