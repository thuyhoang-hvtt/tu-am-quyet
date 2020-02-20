export const PlayerActions = {
	PLAY: 'PLAY',
	PAUSE: 'PAUSE',
	STOP: 'STOP',
	RESUME: 'RESUME',
	OPEN: 'OPEN',
	CLOSE: 'CLOSE',
	RESET: 'RESET',
	ADD_CONTENT: 'ADD_CONTENT',
	ADD_INFO: 'ADD_INFO'
};

export const openPlayer = isExpanded => ({
	type: PlayerActions.OPEN,
	isExpanded
});

export const closePlayer = () => ({
	type: PlayerActions.CLOSE
});

export const addContent = content => ({
	type: PlayerActions.ADD_CONTENT,
	content
});

export const addInfo = info => ({
	type: PlayerActions.ADD_INFO,
	info
});
