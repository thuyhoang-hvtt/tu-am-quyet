// @flow
import React from 'react';
import { Grid, makeStyles, Typography, Zoom } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import NavigateBar from '../components/NavigateBar';
import WebIcon from '../components/WebIcon';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	searchGrid: {
		paddingTop: 200,
		textAlign: 'center',
		alignItems: 'center',
		color: theme.palette.text.secondary
	},
	labelGrid: {
		minHeight: 30,
		display: 'flex',
		flexWrap: 'wrap',
		paddingBottom: 6
	},
	websiteGrid: {
		minHeight: 60
	},
	copyrightGrid: {
		paddingTop: 360
	},
	copyright: {
		paddingRight: 16
	}
}));

export default function HomePage() {
	const classes = useStyles();
	const { hovered } = useSelector(state => state.home);

	return (
		<HomeWrapper container justify="center">
			<Grid className={classes.searchGrid} item xs={12}>
				<NavigateBar />
			</Grid>
			<Grid className={classes.labelGrid} item xs={5}>
				<Label24 alt="label" src="resources/OR.png" />
			</Grid>
			<Grid item xs={12}>
				<Grid className={classes.websiteGrid} container justify="center">
					{[
						'truyencv-logo.png',
						'ttv-logo.png',
						'truyenyy-logo.png',
						'wikidich-logo.png'
					].map(src => (
						<WebIcon key={src} src={src} />
					))}
				</Grid>
			</Grid>
			<Grid className={classes.labelGrid} item xs={5}>
				{hovered && (
					<Zoom in={hovered !== ''}>
						<Label150 alt="label" src={`resources/${hovered}`} />
					</Zoom>
				)}
			</Grid>
			<Grid className={classes.copyrightGrid} item xs={12}>
				<Typography className={classes.copyright} align="right">
					Copyright ⌬ Tự Âm Quyết
				</Typography>
			</Grid>
		</HomeWrapper>
	);
}

const HomeWrapper = styled(Grid)`
	height: 100vh;
	background-image: url('resources/home-page.png');
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: center;
	background-size: 360px 800px;
	-webkit-app-region: drag;
`;

const Label150 = styled.img`
	margin: auto;
	width: 150px;
	height: 24px;
`;
const Label24 = styled.img`
	margin: auto;
	width: 24px;
	height: 24px;
`;
