import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import "../pages/Home/Home.scss";

//icons
import { FiShoppingCart } from "react-icons/fi";


const Header = () => {
  return (
    <div className="root">
      <AppBar className="appbar-style" position="static">
        <Toolbar >
          <FiShoppingCart edge="start" className="menuButton" color="inherit" aria-label="menu">
            <MenuIcon />
          </FiShoppingCart>
          <Typography variant="h6" className="title">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};



export default Header;