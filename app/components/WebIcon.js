import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { hoveredOnChange } from '../actions/home';

const useStyles = makeStyles(() => ({
	alignBottom: {
		margin: 'auto 0 0'
	},
	webIcon: {
		margin: '0px auto',
		cursor: 'pointer',
		transition: 'width .3s, height .3s, transform .3s',
		'&:hover': {
			width: 54,
			height: 54,
			transform: 'rotate(360deg)',
			boxShadow: '0 7px 5px 0px rgba(3, 9, 5, .7)'
		}
	}
}));

function WebIcon(props) {
	const classes = useStyles();
	const { src } = props;
	const dispatch = useDispatch();

	return (
		<Grid className={classes.alignBottom} item xs={2}>
			<Avatar
				className={classes.webIcon}
				variant="rounded"
				src={`resources/${src}`}
				onMouseEnter={() =>
					dispatch(hoveredOnChange(`${src.split('-')[0]}-com.png`))
				}
				onMouseLeave={() => dispatch(hoveredOnChange(''))}
			/>
		</Grid>
	);
}

WebIcon.propTypes = {
	src: PropTypes.string.isRequired
};

export default WebIcon;
