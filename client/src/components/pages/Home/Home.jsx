import React from 'react';
import Header from '../../partials/Header'
import ItemBanner from '../../partials/ItemBanner'
import PropTypes from 'prop-types';

const Home = () => {
  return (
    <div className="home-styling">
    <ItemBanner>
        <Header />
    </ItemBanner>
      
    </div>
  );
};

Home.defaultProps = {
};

Home.propTypes = {
};

export default Home;