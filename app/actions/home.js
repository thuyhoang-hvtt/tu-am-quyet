export const HomeActions = {
	hrefOnChanged: 'HREF_ON_CHANGED',
	hoveredOnChanged: 'HOVERED_ON_CHANGED'
};

export function hrefOnChange(href) {
	return {
		type: HomeActions.hrefOnChanged,
		href
	};
}

export function hoveredOnChange(hovered) {
	return {
		type: HomeActions.hoveredOnChanged,
		hovered
	};
}
