import React from 'react';
import {
	withStyles,
	TextField,
	makeStyles,
	Grid,
	IconButton,
	CircularProgress
} from '@material-ui/core';
import { SendOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { hrefOnChange } from '../actions/home';
import { openPlayer, addInfo, addContent } from '../actions/player';
import API from '../api/API';
import { ajaxLoading, generateError } from '../actions/ajax';
import useNavigate from '../api/useNavigate';

const useStyles = makeStyles(() => ({
	icon: {
		color: 'inherit',
		fontSize: 24,
		cursor: 'pointer'
	},
	iconButton: {
		width: 48,
		height: 48,
		color: '#005A46',
		'&:hover': {
			backgroundColor: '#A2D5C9',
			borderColor: '#A2D5C9',
			boxShadow: 'none'
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#A2D5C9',
			borderColor: '#A2D5C9'
		},
		'&:focus': {
			borderColor: '#A2D5C9',
			boxShadow: '0 0 2 0.2rem rgba(162, 213, 201, .5)'
		},
		'& .Mui-disabled': {
			color: '#BEC9C7'
		}
	},
	circle: {
		color: '#00997C'
	},
	margin: {
		margin: '0 6px'
	}
}));

const Bar = withStyles({
	root: {
		'& .MuiInputBase-root': {
			color: '#005A46'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#005A46'
		},
		'& .MuiInput-underline:before': {
			display: 'none'
		}
	}
})(TextField);

function NavigateBar() {
	const classes = useStyles();
	const { href } = useSelector(state => state.home);
	const { error, loading } = useSelector(state => state.ajax);
	const dispatch = useDispatch();

	const useRequest = async url => {
		let response;

		try {
			response = await API.get(url);
		} catch (e) {
			dispatch(generateError(e.message));
		}
		return response;
	};

	const handleNavigate = async event => {
		event.preventDefault();
		dispatch(ajaxLoading(true));
		(await useNavigate(href, false)).map(action => dispatch(action));
		dispatch(ajaxLoading(false));
	};

	return (
		<Grid container justify="center" alignItems="center">
			<Grid className={classes.margin} item xs={1} />
			<Grid className={classes.margin} item xs={8}>
				<Bar
					fullWidth
					placeholder="pham-nhan-tu-tien"
					onChange={e => dispatch(hrefOnChange(e.target.value))}
					value={href}
					disabled={loading}
					onKeyPress={e => e.key === 'Enter' && handleNavigate(e)}
				/>
			</Grid>
			<Grid className={classes.margin} item xs={1}>
				{loading ? (
					<CircularProgress className={classes.circle} />
				) : (
					<IconButton
						className={classes.iconButton}
						disabled={href === ''}
						onClick={handleNavigate}
					>
						<SendOutlined className={classes.icon} />
					</IconButton>
				)}
			</Grid>
		</Grid>
	);
}

export default NavigateBar;
