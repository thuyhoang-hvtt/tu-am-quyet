export const AjaxActions = {
	LOADING: 'LOADING',
	ADD_CONTENT: 'ADD_CONTENT',
	ADD_INFO: 'ADD_INFO',
	WARNING: 'WARNING',
	RESET: 'RESET_AJAX'
};

export const ajaxLoading = loading => ({
	type: AjaxActions.LOADING,
	loading
});

export const generateError = error => ({
	type: AjaxActions.WARNING,
	error
});

export const clearError = () => ({
	type: AjaxActions.RESET
});
