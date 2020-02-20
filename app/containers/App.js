// @flow
import React, { useEffect } from 'react';
import Routes from '../Routes';
import ErrorDrawer from '../components/Errors';
import Player from '../components/Player';
import PlayerCore from '../components/PlayerCore';

export default function App() {
	return (
		<>
			<PlayerCore />
			<Player />
			<ErrorDrawer />
			<Routes />
		</>
	);
}
