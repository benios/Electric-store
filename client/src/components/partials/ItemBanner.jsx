import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "../pages/Home/Home.scss";


const ItemBanner = () => {
  return (
    <Container className='Item-banner-container'>
      <Grid item md={6} className="right-side">
        <Grid container direction="row" justify="flex-start" alignItems="center" >
          <Typography variant="h1" component="h2" className="title" gutterBottom>
            המוצרים הנמכרים של 2020
          </Typography>
        </Grid>
      </Grid>
      
    </Container>
  );
};

export default ItemBanner;