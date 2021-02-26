import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Grid, Paper, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Carousel.scss'

function Item({item})
{
    return (
        <Paper elevation={0} className="carousel-item">
            <Button >
            <Grid container justify="center" alignItems="center" className="banner-button-container">
                <Grid item>
                    <Typography variant="h3" className="banner-text">{item.title}</Typography>
                </Grid>
                <Grid item>
                    <img src= {item.src} alt={item.alt} className="banner-img"/>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" className="banner-text"> {item.content} <span className="txt-highlight">{item.price}</span></Typography>
                </Grid>
            </Grid>
            </Button>
        </Paper>
    )
}

function WelcomeCarousel()
{
    var items = [
        {
            title: "",
            src: "/img/banner-cam.png",
            alt: "camera banner",
            content: "לחץ על הבאנר כדי למצוא את המצלמה המתאימה לך",
            price: ""
        },
        {
            title: "",
            src: "/img/banner-phones.png",
            alt: "phones banner",
            content: "",
            price: ""
        },
    ]

    return (
        <Carousel 
            className="carousel-container"
            navButtonsAlwaysInvisible={true}
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}



export default WelcomeCarousel;