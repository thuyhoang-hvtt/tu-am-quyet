import React from 'react';
import { Switch, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import routes from './constants/routes.json';
import { MenuPage, HomePage } from './containers';

export default function Routes() {
	const location = useLocation();
	return (
		<AnimatePresence>
			<Switch location={location} key={location.pathname}>
				<Route path={routes.MENU} component={MenuPage} />
				<Route path={routes.HOME} component={HomePage} />
			</Switch>
		</AnimatePresence>
	);
}
