import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openPlayer } from '../actions/player';

export default function PlayerCore() {
	const { isPlaying, isOpened } = useSelector(state => state.player);
	const dispatch = useDispatch();

	const handleMouseUp = event => {
		event.preventDefault();

		dispatch(openPlayer(false));
	};

	return (
		<>
			{!isOpened && isPlaying && (
				<Popup
					initial={{
						scale: 0
					}}
					animate={{
						scale: [1, 1.4, 1],
						rotate: [0, 180, 360],
						borderRadius: ['20%', '50%', '20%']
					}}
					transition={{
						duration: 2,
						ease: 'easeInOut',
						times: [0, 0.5, 1],
						loop: Infinity,
						repeatDelay: 0
					}}
					exit={{
						scale: 0
					}}
					onMouseUp={handleMouseUp}
				/>
			)}
		</>
	);
}

const Popup = styled(Motion.div)`
	position: fixed;
	bottom: 80px;
	right: 60px;
	z-index: 900;
	background: linear-gradient(120deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	border-radius: 30px;
	width: 48px;
	height: 48px;
	box-shadow: 0 0 20px 5px rgba(0, 153, 124, 0.7);
	animation: GradientAnimation 30s ease infinite;
	cursor: pointer;

	@keyframes GradientAnimation {
		0% {
			background-position: 10% 0%;
		}
		50% {
			background-position: 91% 100%;
		}
		100% {
			background-position: 10% 0%;
		}
	}
`;
