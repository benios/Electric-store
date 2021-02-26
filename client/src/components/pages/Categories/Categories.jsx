import React, { useEffect, useState ,useCallback, useRef} from "react";
import { useParams } from "react-router";
import Container from '@material-ui/core/Container';
import Header from "../../partials/Header";
import ProductCard from "../../ProductCard/ProductCard";
import CategoryTitle from "../../partials/CategoryTitle/CategoryTitle";
import Grid from "@material-ui/core/Grid";
import API from "../../../utils/api";
import useWindowDimensions from '../../../assests/hooks/useWindowDimensions';
import "./Categories.scss"

import Fab from '@material-ui/core/Fab';
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const Categories = () => {
	const [products, setProducts] = useState([]);
	const title = useParams();
	const { width } = useWindowDimensions();
	const ref = useRef(null);
	const scroll = useCallback((isNegative) => {
    const operator = isNegative ? -1 : 1;
    ref.current.scrollLeft += (width * operator)/2;
  },[width]);

  const scrollRight = () =>{scroll(false)};
  const scrollLeft = () =>{scroll(true)};
	
	useEffect(() => {
		const getProducts = async () => {
			setProducts(await API.getProductByCategory(title.category));
		};
		if (title.category) {
			getProducts();
		}
	}, [title.category]);

	return (
		<div className="category-page">
			<Header />
			<CategoryTitle title={title.category} />
		{	width > 600 ?
			<Grid container className="grid-container" spacing={2}>
				{products.map((product) => {
					return (
						<Grid className="card-container" item xs={12} lg={2} md={4} sm={5}>
							<ProductCard
								productId={product._id}
								img={product.pictureUrl}
								price={product.price}
								title={product.name}
                alt={title.category}
							/>
						</Grid>
					);
				})}
			</Grid> 
			:
			<Container maxWidth={false} className="hot-products-container">
      <Grid item xs={12} className="scroll-btn">
      <Fab onClick={scrollRight} className="scroll-btn-right" color='secondary' size="medium">
        <AiOutlineRight />
      </Fab>
      <Fab onClick={scrollLeft} className="scroll-btn-left" color='secondary' size="medium">
        <AiOutlineLeft />
      </Fab>
      </Grid>
      <Grid container className="products-slider" ref={ref} spacing={3}>
        {products.map((product) => {
          return(
            <Grid className="card-container" item xs={12} lg={3} md={4} sm={5}>
							<ProductCard
								productId={product._id}
								img={product.pictureUrl}
								price={product.price}
								title={product.name}
                alt={title.category}
							/>
						</Grid>
          )
        })}
      </Grid>
    </Container>}
		</div>
	);
};

export default Categories;
