import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Button from "@material-ui/core/Button";
import { ImLocation } from 'react-icons/im';
import { GiPlayerTime } from 'react-icons/gi'
import './Login.scss'


const Signup = () => {
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
					<Grid item xs={12} className="login-title">
						<h1>בוא נתחיל!</h1>
					</Grid>
					<Grid item xs={12} className="signup-form">
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
					<Grid item xs={12} className="small-text">
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
					<Grid item xs={12} className="small-text">
						<TextField
							id="input-with-icon-textfield"
							label="אשר סיסמא"
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
					<Grid item xs={12} className="small-text">
						<TextField
							id="input-with-icon-textfield"
							label="שם פרטי"
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
					<Grid item xs={12} className="small-text">
						<TextField
							id="input-with-icon-textfield"
							label="שם משפחה"
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
					<Grid item xs={12} className="small-text">
						<TextField
							id="input-with-icon-textfield"
							label="כתובת"
							className="text-field"
							InputProps={{
								startAdornment: (
									<InputAdornment
										className="text-field"
										position="start"
									>
										<ImLocation />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} className="small-text">
						<TextField
							id="input-with-icon-textfield"
							label="גיל"
							className="text-field"
							InputProps={{
								startAdornment: (
									<InputAdornment
										className="text-field"
										position="start"
									>
										<GiPlayerTime />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} className="signup-form">
						<Button
							variant="contained"
						>
							הרשם
						</Button>
					</Grid>
					
          <Grid item xs={12} className="signup-link">
         <h5>יש לך כבר משתמש? <Link to="login">התחבר כאן</Link></h5>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

Signup.defaultProps = {};

Signup.propTypes = {};

export default Signup;