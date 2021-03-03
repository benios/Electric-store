import React, { useEffect } from "react";
import get from "lodash/get";
import Header from "../../partials/Header";
import ItemBanner from "../../partials/ItemBanner";
import MostViewedItems from "../../MostViewedItems/MostViewedItems";
import { useSelector, shallowEqual } from "react-redux";
import "./Home.scss";

const Home = () => {

	const categoryTitle = useSelector(state => get(state, "category.title", {}), shallowEqual);
	useEffect(() => {
		console.log(categoryTitle);
	}, [categoryTitle]);
	return (
		<div className="home-styling">
			<Header />
			<ItemBanner />
			<MostViewedItems title="המוצרים החמים"/>
		</div>
	);
};

export default Home;
