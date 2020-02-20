/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
	Drawer,
	Grid,
	Avatar,
	makeStyles,
	Typography,
	Icon
} from '@material-ui/core';
import {
	SkipPreviousRounded,
	ShuffleRounded,
	PlayCircleOutlineRounded,
	SkipNextRounded,
	PauseCircleOutlineRounded,
	MenuRounded,
	ArrowDropUpRounded,
	ArrowDropDownRounded
} from '@material-ui/icons';

import { closePlayer, PlayerActions, addContent } from '../actions/player';
import Animated from './Animated';
import { ajaxLoading } from '../actions/ajax';
import useNavigate from '../api/useNavigate';

const useStyles = makeStyles(theme => ({
	'@keyframes GradientAnimation': {
		'0%': {
			backgroundPosition: '50% 0%'
		},
		'50%': {
			backgroundPosition: '100% 50%'
		},
		'100%': {
			backgroundPosition: '50% 0%'
		}
	},
	'@keyframes ScrollingText': {
		'0%': {
			transform: 'translateX(100%)'
		},
		'100%': {
			transform: 'translateX(-100%)'
		}
	},
	playerSmall: {
		'& .MuiBackdrop-root': {
			background: 'transparent'
		},
		'& .MuiDrawer-paper': {
			boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.5)',
			borderRadius: '180px 180px 0 0',
			background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
			backgroundSize: '400% 400%',
			animation: '$GradientAnimation 30s ease infinite'
		},
		'& .MuiDrawer-paperAnchorBottom': {
			height: 180
		}
	},
	playerLarge: {
		'& .MuiBackdrop-root': {
			background: 'transparent'
		},
		'& .MuiDrawer-paper': {
			boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.5)',
			borderRadius: '360px 50px 0 0',
			background: 'linear-gradient(120deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
			backgroundSize: '400% 400%',
			animation: `$GradientAnimation 30s ease infinite`
		},
		'& .MuiDrawer-paperAnchorBottom': {
			height: 540
		}
	},
	slider: {
		minHeight: 60
	},
	detailInfo: {
		marginTop: 60,
		height: 360,
		overflow: 'hidden'
	},
	posterFrame: {
		width: 180,
		height: 270,
		borderRadius: '180px 10px 0px 0px / 270px 10px 0px 0px'
	},
	title: {
		paddingTop: 16,
		fontSize: 24,
		lineHeight: 1,
		fontWeight: 600,
		color: 'whitesmoke'
	},
	scrollingText: {
		height: 60,
		overflow: 'hidden',
		position: 'relative',
		'& > p': {
			position: 'absolute',
			color: 'whitesmoke',
			width: '300%',
			margin: 0,
			lineHeight: 5,
			textAlign: 'center',
			transform: 'translateX(100%)',
			animation: `$ScrollingText 10s linear infinite`
		}
	},
	playerWraper: {
		height: 120
	}
}));

function Player() {
	const classes = useStyles();
	const {
		isOpened,
		isPlaying,
		isPausing,
		isExpanded,
		content,
		info
	} = useSelector(state => state.player);
	const { chapter, cleanedContent, previous, next } = content;
	const { thumbPoster, title, author, category, status, latest } = info;
	const dispatch = useDispatch();

	const handleClose = event => {
		dispatch(closePlayer());
	};

	const handlePlay = () =>
		isPlaying
			? isPausing
				? dispatch({ type: PlayerActions.RESUME })
				: dispatch({ type: PlayerActions.PAUSE })
			: dispatch({ type: PlayerActions.PLAY });

	const handleNavigate = async (event, url) => {
		event.preventDefault();
		dispatch(ajaxLoading(true));
		if (url) (await useNavigate(url)).map(action => dispatch(action));
		dispatch(ajaxLoading(false));
	};

	useEffect(() => {
		if (isPlaying)
			window.responsiveVoice.speak(cleanedContent, 'Vietnamese Male', {
				rate: 1.3
			});

		return () => {
			if (isPlaying) window.responsiveVoice.cancel();
		};
	}, [cleanedContent, isPlaying]);

	useEffect(() => {
		if (isPausing) window.responsiveVoice.pause();
		else window.responsiveVoice.resume();
	}, [isPausing]);

	return (
		<Drawer
			className={isExpanded ? classes.playerLarge : classes.playerSmall}
			anchor="bottom"
			open={isOpened}
			onClose={handleClose}
		>
			{isExpanded ? (
				<Grid className={classes.detailInfo} container justify="space-around">
					<GridCol item xs={7}>
						<Avatar className={classes.posterFrame} src={thumbPoster} />
					</GridCol>
					<GridCol item xs={5} align="left">
						<Text>{`Tác giả: ${author}`}</Text>
						<Text>{`Thể loại: ${category}`}</Text>
						<Text>{`Tình trạng: ${status}`}</Text>
						<Text>{`Mới nhất: ${latest}`}</Text>
					</GridCol>
					<GridRow className={classes.scrollingText} item xs={10}>
						<Typography className={classes.title} noWrap>
							{`${title} - ${chapter}`}
						</Typography>
					</GridRow>
				</Grid>
			) : (
				<Grid container justify="center">
					<Grid className={classes.scrollingText} item xs={5}>
						<Typography>{`${title} - ${chapter}`}</Typography>
					</Grid>
				</Grid>
			)}
			<Grid
				className={classes.playerWraper}
				container
				justify="center"
				alignItems="center"
			>
				<GridCol item xs={2} content="center">
					<Animated size={24}>
						<Icon
							fontSize="inherit"
							// onMouseUp={handleNavigate}
							component={MenuRounded}
						/>
					</Animated>
					<Animated size={24}>
						<Icon
							fontSize="inherit"
							// onMouseUp={handleNavigate}
							component={ShuffleRounded}
						/>
					</Animated>
				</GridCol>
				<GridRow item xs={2} content="center">
					<Animated size={48} disabled={!previous}>
						<Icon
							fontSize="inherit"
							color={previous ? 'inherit' : 'disabled'}
							onMouseUp={e => handleNavigate(e, previous)}
							component={SkipPreviousRounded}
						/>
					</Animated>
				</GridRow>
				<GridRow item xs={2} content="center">
					<Animated size={64}>
						<Icon
							component={
								isPausing || !isPlaying
									? PlayCircleOutlineRounded
									: PauseCircleOutlineRounded
							}
							fontSize="inherit"
							onMouseUp={handlePlay}
						/>
					</Animated>
				</GridRow>
				<GridRow item xs={2} content="center">
					<Animated size={48} disabled={!next}>
						<Icon
							fontSize="inherit"
							color={next ? 'inherit' : 'disabled'}
							component={SkipNextRounded}
							onMouseUp={e => handleNavigate(e, next)}
						/>
					</Animated>
				</GridRow>
				<GridCol item xs={2} content="center">
					<Animated size={24}>
						<Icon
							fontSize="inherit"
							// onMouseUp={handleNavigate}
							component={ArrowDropUpRounded}
						/>
					</Animated>
					<Animated size={24}>
						<Icon
							fontSize="inherit"
							// onMouseUp={handleNavigate}
							component={ArrowDropDownRounded}
						/>
					</Animated>
				</GridCol>
			</Grid>
		</Drawer>
	);
}

const GridCol = styled(Grid)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: ${props => props.align || `center`};
`;

const GridRow = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: ${props => props.align || `center`};
`;

const Text = styled(Typography)`
	padding: 10px 0px;
`;

export default Player;
