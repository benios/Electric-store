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
import './Login.scss'


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
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "50px" }}>
						<h1>ברוכים הבאים!</h1>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
						<TextField
							id="input-with-icon-textfield"
							label="שם משתמש"
							style={{ color: "rgb(0, 123, 252)" }}
							InputProps={{
								startAdornment: (
									<InputAdornment
										style={{ color: "rgb(0, 123, 252)" }}
										position="start"
									>
										<PersonIcon />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "15px" }}>
						<TextField
							id="input-with-icon-textfield"
							label="סיסמא"
							style={{ color: "rgb(0, 123, 252)" }}
							InputProps={{
								startAdornment: (
									<InputAdornment
										style={{ color: "rgb(0, 123, 252)" }}
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
						style={{
							textAlign: "end",
							marginTop: "10px",
							paddingLeft: "27%",
							fontSize: "50%",
						}}
					>
						<Link to="">שכחת את הסיסמא?</Link>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
						<Button
							style={{ backgroundColor: "rgb(1, 72, 164)", color: "#ffff" ,width: '100px', borderRadius: '40px'}}
							variant="contained"
						>
							התחבר
						</Button>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "15px" }}>
						<h5>או התחבר באמצעות</h5>
					</Grid>
          <Grid container spacing={3} style={{  marginTop: "10px" }}>
          
					<Grid item xs={6} style={{ textAlign: "end", marginTop: "2px" }}>
						<Button
							variant="contained"
              style={{ backgroundColor: "rgb(57, 92, 146)", color: "#ffff"}}
							startIcon={<FacebookIcon />}
						>פייסבוק</Button>
					</Grid>

          <Grid item xs={6} style={{ textAlign: "start", marginTop: "2px"}}>
						<Button
							variant="contained"
              style={{ backgroundColor: "rgb(241, 68, 54)",width: '100px', color: "#ffff" }}
							startIcon={<FaGoogle/>}
						>גוגל</Button>
					</Grid>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "2px" }}>
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
