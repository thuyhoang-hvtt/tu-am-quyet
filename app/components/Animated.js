import React from 'react';
import { motion as Motion } from 'framer-motion';
import PropTypes from 'prop-types';

const iconVariant = {
	idle: {
		scale: 1,
	},
	hovered: {
		scale: 1.3
	},
	pressed: {
		scale: 0.8
	}
};

function Animated(props) {
	const { size, disabled, children, color } = props;

	return (
		<Motion.div
			style={{
				width: size,
				height: size,
				color,
				fontSize: size
			}}
			variants={disabled || iconVariant}
			initial="idle"
			whileHover="hovered"
			whileTap="pressed"
		>
			{children}
		</Motion.div>
	);
}

Animated.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.number.isRequired,
	color: PropTypes.string,
	disabled: PropTypes.bool
};

Animated.defaultProps = {
	color: 'whitesmoke',
	disabled: false
};

export default Animated;
