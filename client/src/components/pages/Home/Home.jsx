import React from 'react';
import Header from '../../partials/Header';
import ItemBanner from '../../partials/ItemBanner';
import MostViewedItems from '../../MostViewedItems/MostViewedItems';
import './Home.scss';

const Home = () => (
	<div className="home-styling">
		<Header />
		<ItemBanner />
		<MostViewedItems title="המוצרים החמים" />
	</div>
);

export default Home;
