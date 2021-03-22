import React from 'react';
import Carousel from 'react-material-ui-carousel';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import './Carousel.scss';

function Item({ item }) {
	return (
		<Paper elevation={0} className="carousel-item">
			<img src={item.src} alt={item.alt} className="banner-img" />
		</Paper>
	);
}

function WelcomeCarousel() {
	const items = [
		{
			id: 1,
			src: '/img/banner-cam.png',
			alt: 'camera banner',
		},
		{
			id: 2,
			src: '/img/banner-phones.png',
			alt: 'phones banner',
		},
	];

	return (
		<div className="carousel-container">
			<Carousel
				navButtonsAlwaysInvisible
			>
				{
					items.map((item) => <Item key={item.id} item={item} />)
				}
			</Carousel>
		</div>
	);
}

Item.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.number.isRequired,
		src: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired,
	}).isRequired,
};

export default WelcomeCarousel;
