import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { motion as Motion } from 'framer-motion';
import { useHistory } from 'react-router';

import { hoveredOnChange } from '../actions/home';

const useStyles = makeStyles(() => ({
	alignBottom: {
		margin: 'auto 0 0'
	},
	webIcon: {
		margin: '0px auto',
		cursor: 'pointer',
		'&:hover': {
			boxShadow: '0 7px 5px 2px rgba(3, 9, 5, .4)'
		}
	}
}));

const avatarVariant = {
	idle: {
		scale: 1
	},
	hovered: {
		scale: 1.3
	},
	pressed: {
		scale: 0.6,
		rotateZ: '360deg'
	}
};

const motionStyle = {
	width: 40
};

function WebIcon(props) {
	const classes = useStyles();
	const { src } = props;
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<Grid item xs={2}>
			<Motion.div
				style={motionStyle}
				variants={avatarVariant}
				initial="idle"
				whileHover="hovered"
				whileTap="pressed"
			>
				<Avatar
					className={classes.webIcon}
					variant="rounded"
					src={`resources/${src}`}
					onMouseEnter={() =>
						dispatch(hoveredOnChange(`${src.split('-')[0]}-com.png`))
					}
					onMouseLeave={() => dispatch(hoveredOnChange(''))}
					onMouseUp={() => history.push(`/menu/${src.split('-')[0]}`)}
				/>
			</Motion.div>
		</Grid>
	);
}

WebIcon.propTypes = {
	src: PropTypes.string.isRequired
};

export default WebIcon;
