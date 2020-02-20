// @flow
import React, { useEffect } from 'react';
import { Grid, makeStyles, Typography, Zoom } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import NavigateBar from '../components/NavigateBar';
import WebIcon from '../components/WebIcon';
import { resetHomeState } from '../actions/home';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		height: '100vh'
	},
	searchGrid: {
		paddingTop: 200,
		textAlign: 'center',
		alignItems: 'center',
		color: theme.palette.text.secondary
	},
	labelGrid: {
		minHeight: 40,
		display: 'flex',
		flexWrap: 'wrap'
	},
	websiteGrid: {
		minHeight: 50,
		display: 'flex',
		justifyItems: 'center',
		alignItems: 'flex-end'
	},
	copyrightGrid: {
		paddingTop: 340
	},
	copyright: {
		paddingRight: 16
	}
}));

export default function Home() {
	const classes = useStyles();
	const { hovered } = useSelector(state => state.home);
	const { isOpened } = useSelector(state => state.player);
	const dispatch = useDispatch();

	useEffect(() => {
		// Check internet connection
		return () => {
			// Home Will Unmount
			dispatch(resetHomeState());
		};
	}, []);

	return (
		<Grid className={classes.root} container justify="center">
			<HomeBackground z={isOpened ? 1 : -1} />
			<Grid className={classes.searchGrid} item xs={12}>
				<NavigateBar />
			</Grid>
			<Grid item xs={1}>
				<Label30 alt="label" src="resources/OR.png" />
			</Grid>
			<Grid item xs={12}>
				<Grid className={classes.websiteGrid} container justify="center">
					{[
						'truyencv-logo.png',
						'tangthuvien-logo.png',
						'truyenyy-logo.png',
						'wikidich-logo.png'
					].map(src => (
						<WebIcon key={src} src={src} />
					))}
				</Grid>
			</Grid>
			<Grid className={classes.labelGrid} item xs={6}>
				{hovered && (
					<Zoom in={hovered !== ''}>
						<Label180 alt="label" src={`resources/${hovered}`} />
					</Zoom>
				)}
			</Grid>
			<Grid className={classes.copyrightGrid} item xs={12}>
				<Typography className={classes.copyright} align="right">
					Copyright ⌬ Tự Âm Quyết
				</Typography>
			</Grid>
		</Grid>
	);
}

const HomeBackground = styled.div`
	z-index: ${props => props.z};
	top: 0;
	left: 0;
	position: absolute;
	height: 100vh;
	width: 100vw;
	background-image: url('resources/home-page.jpg');
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: center;
	background-size: 360px 800px;
	-webkit-app-region: drag;
`;

const Label180 = styled.img`
	margin: auto;
	width: 180px;
	height: 24px;
`;
const Label30 = styled.img`
	margin: auto;
	width: 30px;
	height: 30px;
`;
