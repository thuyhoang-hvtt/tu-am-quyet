import React from 'react';
import {
	withStyles,
	TextField,
	makeStyles,
	Grid,
	IconButton
} from '@material-ui/core';
import { SendOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { hrefOnChange } from '../actions/home';

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
	const dispatch = useDispatch();

	return (
		<Grid container justify="center" alignItems="center">
			<GridItem item xs={1} />
			<GridItem item xs={8}>
				<Bar
					fullWidth
					placeholder="pham-nhan-tu-tien"
					onChange={e => dispatch(hrefOnChange(e.target.value))}
					value={href}
				/>
			</GridItem>
			<GridItem item xs={1}>
				<IconButton className={classes.iconButton} disabled={href === ''}>
					<SendOutlined className={classes.icon} />
				</IconButton>
			</GridItem>
		</Grid>
	);
}

const GridItem = styled(Grid)`
	margin: 0 3px;
`;

export default NavigateBar;
