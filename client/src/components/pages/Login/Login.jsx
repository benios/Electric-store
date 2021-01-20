import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FacebookIcon from '@material-ui/icons/Facebook';
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Button from "@material-ui/core/Button";
import { FaGoogle } from 'react-icons/fa';
import './Login.scss';



import loginImg from "../../../assests/images/logo.jpg";

const Login = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				maxWidth="sm"
				spacing={3}
			>
				<Grid
					item
					className="login-container"
				>
					<Grid item className="image-container" xs={12}>
						<img
							className="image-logo"
							src={loginImg}
							alt="login"
						/>
					</Grid>
					<Grid item xs={12} className="login-title">
						<h1>ברוכים הבאים!</h1>
					</Grid>
					<Grid item xs={12} className="login-form">
						<TextField
							id="input-with-icon-textfield"
							label="שם משתמש"
							className="text-field"
							InputProps={{
								startAdornment: (
									<InputAdornment
										className="text-field"
										position="start"
									>
										<PersonIcon />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} className="login-form">
						<TextField
							id="input-with-icon-textfield"
							label="סיסמא"
							className="text-field"
							InputProps={{
								startAdornment: (
									<InputAdornment
										className="text-field"
										position="start"
									>
										<LockOpenIcon />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						className="small-link"
					>
						<Link to="">שכחת את הסיסמא?</Link>
					</Grid>
					<Grid item xs={12} className="login-form">
						<Button
							className="submit-button"
							variant="contained"
						>
							התחבר
						</Button>
					</Grid>
					<Grid item xs={12} className="small-text">
						<h5>או התחבר באמצעות</h5>
					</Grid>
          <Grid container spacing={3} className="button-container">
          
					<Grid item xs={6} className="right-button">
						<Button
							variant="contained"
							startIcon={<FacebookIcon />}
						>פייסבוק</Button>
					</Grid>

          <Grid item xs={6} className="left-button">
						<Button
							variant="contained"
							startIcon={<FaGoogle/>}
						>גוגל</Button>
					</Grid>
          </Grid>
          <Grid item xs={12} className="signup-link">
         <h5>אין לך משתמש? <Link to="signup">הרשם כאן</Link></h5>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

Login.defaultProps = {};

Login.propTypes = {};

export default Login;
