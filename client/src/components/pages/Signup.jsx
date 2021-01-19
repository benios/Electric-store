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
				style={{}}
			>
				<Grid
					item
					style={{
						backgroundColor: "#ffff",
						height: "90vh",
						marginTop: "50px",
						boxShadow: "0px 0px 12px 2px rgba(15, 15, 15, 0.2)",
						borderRadius: "30px",
						width: '500px',
					}}
				>
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "50px" }}>
						<h1>בוא נתחיל!</h1>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "40px" }}>
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
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "15px" }}>
						<TextField
							id="input-with-icon-textfield"
							label="אשר סיסמא"
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
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "15px" }}>
						<TextField
							id="input-with-icon-textfield"
							label="שם פרטי"
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
							label="שם משפחה"
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
							label="כתובת"
							style={{ color: "rgb(0, 123, 252)" }}
							InputProps={{
								startAdornment: (
									<InputAdornment
										style={{ color: "rgb(0, 123, 252)" }}
										position="start"
									>
										<ImLocation />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "15px" }}>
						<TextField
							id="input-with-icon-textfield"
							label="גיל"
							style={{ color: "rgb(0, 123, 252)" }}
							InputProps={{
								startAdornment: (
									<InputAdornment
										style={{ color: "rgb(0, 123, 252)" }}
										position="start"
									>
										<GiPlayerTime />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center", marginTop: "40px" }}>
						<Button
							style={{ backgroundColor: "rgb(1, 72, 164)", color: "#ffff" ,width: '100px', borderRadius: '40px'}}
							variant="contained"
						>
							הרשם
						</Button>
					</Grid>
					
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "2px" }}>
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