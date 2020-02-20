export const HomeActions = {
	HREF_ON_CHANGED: 'HREF_ON_CHANGED',
	HOVERED_ON_CHANGED: 'HOVERED_ON_CHANGED',
	RESET: 'RESET_HOME'
};

export function hrefOnChange(href) {
	return {
		type: HomeActions.HREF_ON_CHANGED,
		href
	};
}

export function hoveredOnChange(hovered) {
	return {
		type: HomeActions.HOVERED_ON_CHANGED,
		hovered
	};
}

export function resetHomeState() {
	return {
		type: HomeActions.RESET
	};
}
