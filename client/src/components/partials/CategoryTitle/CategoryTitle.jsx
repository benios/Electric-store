import React from 'react';
import PropTypes from 'prop-types';
import './CategoryTitle.scss';
import useWindowDimensions from '../../../assests/hooks/useWindowDimensions';

const CategoryTitle = ({ title }) => {
	const { width } = useWindowDimensions();
	let img = `${title}-title`;
	if (width <= 960) {
		img = `${title}-title-md`;
	}
	if (width <= 600) {
		img = `${title}-title-sm`;
	}
	if (width <= 500) {
		img = `${title}-title-xs`;
	}

	return (
		<div className="title-container">
			<img src={`/img/${img}.png`} alt="cameras-title" className="cameras-title" />
		</div>
	);
};

CategoryTitle.propTypes = {
	title: PropTypes.string.isRequired,
};

export default CategoryTitle;
