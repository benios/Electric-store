import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductCard from '../ProductCard/ProductCard';
import IconButton from "@material-ui/core/IconButton";
import useWindowDimensions from '../../assests/hooks/useWindowDimensions';
import Fab from '@material-ui/core/Fab';
import './MostViewedItems.scss'


import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const items=[
  {
    id : 1,
    name : "טלוויזיה",
    price : 2340,
    quantity : 2,
    pictureUrl : "/img/tv-smart.png",
    description : "אחלה טלוויזיה",
    date : 1605627255013.0,
},
{
    id : 2,
    name : "טלוויזיה",
    price : 2340,
    quantity : 2,
    pictureUrl : "/img/tv-smart.png",
    description : "אחלה טלוויזיה",
    date : 1605627255013.0,
},
{
    id : 3,
    name : "טלוויזיה",
    price : 2340,
    quantity : 2,
    pictureUrl : "/img/tv-smart.png",
    description : "אחלה טלוויזיה",
    date : 1605627255013.0,
},
{
    id : 4,
    name : "טלוויזיה",
    price : 2340,
    quantity : 2,
    pictureUrl : "/img/tv-smart.png",
    description : "אחלה טלוויזיה",
    date : 1605627255013.0,
},
{
    id : 5,
    name : "טלוויזיה",
    price : 2340,
    quantity : 2,
    pictureUrl : "/img/tv-smart.png",
    description : "אחלה טלוויזיה",
    date : 1605627255013.0,
},
{
    id : 6,
    name : "טלוויזיה",
    price : 2340,
    quantity : 2,
    pictureUrl : "/img/tv-smart.png",
    description : "אחלה טלוויזיה",
    date : 1605627255013.0,
},
{
    id : 7,
    name : "טלוויזיה",
    price : 2340,
    quantity : 2,
    pictureUrl : "/img/tv-smart.png",
    description : "אחלה טלוויזיה",
    date : 1605627255013.0,
},
{
  id : 8,
  name : "טלוויזיה",
  price : 2340,
  quantity : 2,
  pictureUrl : "/img/tv-smart.png",
  description : "אחלה טלוויזיה",
  date : 1605627255013.0,
},
{
  id : 9,
  name : "טלוויזיה",
  price : 2340,
  quantity : 2,
  pictureUrl : "/img/tv-smart.png",
  description : "אחלה טלוויזיה",
  date : 1605627255013.0,
},
];

const MostViewedItems = () => {

  const { width } = useWindowDimensions();

  const ref = useRef(null);

  const scroll = useCallback((isNegative) => {
    const operator = isNegative ? -1 : 1;
    ref.current.scrollLeft += (width * operator)/2;
  },[width]);

  const scrollRight = () =>{scroll(false)};
  const scrollLeft = () =>{scroll(true)};



  return (
    <Container maxWidth={false} className="hot-products-container">
      <Grid item xs={12} className="slider-title">
        המוצרים החמים
      </Grid>
      <Grid item xs={12} className="scroll-btn">
      <Fab onClick={scrollRight} className="scroll-btn-right" color='secondary' size="medium">
        <AiOutlineRight />
      </Fab>
      <Fab onClick={scrollLeft} className="scroll-btn-left" color='secondary' size="medium">
        <AiOutlineLeft />
      </Fab>
      </Grid>
      <Grid container className="products-slider" ref={ref} spacing={3}>
        {items.map((item) => {
          return(
            <Grid item key={item.id} className="card-container">
              <ProductCard img={item.pictureUrl} price={item.price} title={item.name}/>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
};

MostViewedItems.defaultProps = {
};

MostViewedItems.propTypes = {
};

export default MostViewedItems;