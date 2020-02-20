import React from 'react';
import { motion as Motion } from 'framer-motion';
import Home from './Home';
import Menu from './Menu';

const pageVariants = {
	initial: {
		opacity: 0,
		y: '100vh',
		scale: 1.5
	},
	in: {
		opacity: 1,
		y: 0,
		scale: 1
	},
	out: {
		opacity: 0,
		y: '-100vh',
		scale: 0.8
	}
};

const pageTransition = {
	type: 'tween',
	ease: 'easeOut',
	duration: 0.5
};

const pageStyle = {
	position: 'absolute'
};

export const HomePage = () => (
	<Motion.div
		style={pageStyle}
		initial="initial"
		animate="in"
		exit="out"
		variants={pageVariants}
		transition={pageTransition}
	>
		<Home />
	</Motion.div>
);

export const MenuPage = () => (
	<Motion.div
		style={pageStyle}
		initial="initial"
		animate="in"
		exit="out"
		variants={pageVariants}
		transition={pageTransition}
	>
		<Menu />
	</Motion.div>
);
