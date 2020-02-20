import React from 'react';
import { Drawer, makeStyles, Grid, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Error, ErrorOutlineRounded } from '@material-ui/icons';
import styled from 'styled-components';
import { clearError } from '../actions/ajax';

const useStyles = makeStyles(() => ({
	errorDrawer: {
		'& .MuiDrawer-paper': {
			boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.5)',
			borderRadius: '10px 10px 0 0'
		},
		'& .MuiDrawer-paperAnchorBottom': {
			height: 180
		}
	},
	errorIcon: {
		color: '#e8315d',
		fontSize: 48,
		padding: '20px 0'
	},
	errorContent: {
		lineHeight: 4,
		color: '#bbc1c0'
	}
}));

// eslint-disable-next-line import/prefer-default-export
export default function ErrorDrawer() {
	const classes = useStyles();
	const { error } = useSelector(state => state.ajax);
	const dispatch = useDispatch();

	return (
		<Drawer
			className={classes.errorDrawer}
			anchor="bottom"
			open={error !== ''}
			onClose={() => dispatch(clearError())}
		>
			<Grid container justify="center" alignItems="center">
				<GridRow item xs={4}>
					<ErrorOutlineRounded className={classes.errorIcon} />
				</GridRow>
				<GridRow item xs={10}>
					<Typography className={classes.errorContent} noWrap>
						{error}
					</Typography>
				</GridRow>
			</Grid>
		</Drawer>
	);
}

const GridRow = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;
`;
