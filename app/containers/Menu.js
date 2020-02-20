import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';

const backgrounds = {
	truyencv: `linear-gradient(
		to right bottom,
		#e5f3f0,
		#ebf4ec,
		#f2f4eb,
		#f9f4ec,
		#fef4ef
	)`,
	tangthuvien: `linear-gradient(
		to right bottom,
		#fef4ef,
		#fff2e3,
		#fff1d6,
		#fff1c9,
		#fcf3bd
	)`,
	truyenyy: `linear-gradient(
		to right bottom,
		#fcf3bd,
		#ffebcc,
		#ffe9e3,
		#ffecf3,
		#f6f1f6
	)`,
	wikidich: `linear-gradient(
		to right bottom,
		#f6f1f6,
		#f1f1f8,
		#ebf2f9,
		#e6f3f6,
		#e5f3f0
	)`
};

function Menu() {
	const { site } = useParams();

	return (
		<Grid container>
			<MenuBackground site={site} />
			<Link to="/">Back</Link>
		</Grid>
	);
}

const MenuBackground = styled.div`
	z-index: -1;
	top: 0;
	left: 0;
	position: absolute;
	height: 100vh;
	width: 100vw;
	background-image: ${props => backgrounds[props.site]};
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: center;
	background-size: 360px 800px;
	-webkit-app-region: drag;
`;

export default Menu;
