import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../../../utils/api";
import doesCookieExist from "../../../utils/doesCookieExist";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FacebookIcon from "@material-ui/icons/Facebook";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Button from "@material-ui/core/Button";
import { FaGoogle } from "react-icons/fa";
import "./Login.scss";

import loginImg from "../../../assests/images/logo.jpg";
require('dotenv').config();

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onUsernameChange = useCallback((e) => {
		setUsername(e.target.value);
	}, []);
	const onPasswordChange = useCallback((e) => setPassword(e.target.value), []);

	let history = useHistory();

	const responseFacebook = useCallback((response) => {
		setError("");
		if(response.accessToken){
			history.push("/");
		} else {
			setError("התחברות דרך חשבון הפייסבוק נכשלה");
		}
	},[history]);

	const responseGoogle = useCallback((response) => {
		setError("");
		if(response.accessToken){
			history.push("/");
		} else {
			setError("התחברות דרך חשבון הגוגל נכשלה");
		}
	},[history]);

	const onSubmit = useCallback(async () => {
		setError("");
		await API.login(username, password);
		const token = doesCookieExist("token");
		if (token) {
			history.push("/");
		} else {
			setError("שם משתמש או סיסמא שגויים");
		}
	}, [history, password, username]);

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
				<Grid item className="login-container">
					<Grid item className="image-container" xs={12}>
						<img className="image-logo" src={loginImg} alt="login" />
					</Grid>
					<Grid item xs={12} className="login-title">
						<h1>ברוכים הבאים!</h1>
					</Grid>
					<Grid item xs={12} className="login-form">
						<TextField
							id="input-with-icon-textfield"
							label="שם משתמש"
							className="text-field"
							value={username}
							onChange={onUsernameChange}
							InputProps={{
								startAdornment: (
									<InputAdornment className="text-field" position="start">
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
							type="password"
							value={password}
							onChange={onPasswordChange}
							error={error.length > 0}
							helperText={error.length > 0 ? error : " "}
							InputProps={{
								startAdornment: (
									<InputAdornment className="text-field" position="start">
										<LockOpenIcon />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} className="small-link">
						<Link to="">שכחת את הסיסמא?</Link>
					</Grid>
					<Grid item xs={12} className="login-form">
						<Button
							className="submit-button"
							variant="contained"
							type="submit"
							onClick={onSubmit}
						>
							התחבר
						</Button>
					</Grid>
					<Grid item xs={12} className="small-text">
						<h5>או התחבר באמצעות</h5>
					</Grid>
					<Grid container spacing={3} className="button-container">
						<Grid item xs={6} className="right-button">
							<FacebookLogin
								appId={process.env.FACEBOOK_API_KEY}
								autoLoad={false}
								callback={responseFacebook}
								render={(renderProps) => (
									<Button
										variant="contained"
										startIcon={<FacebookIcon /> }
										onClick={renderProps.onClick}
									>
										פייסבוק
									</Button>
								)}
							/>
						</Grid>

						<Grid item xs={6} className="left-button">
							<GoogleLogin
								clientId={process.env.GOOGLE_API_KEY}
								render={(renderProps) => (
									<Button
										variant="contained"
										startIcon={<FaGoogle />}
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									>
										גוגל
									</Button>
								)}
								buttonText="Login"
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={"single_host_origin"}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} className="signup-link">
						<h5>
							אין לך משתמש? <Link to="signup">הרשם כאן</Link>
						</h5>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

Login.defaultProps = {};

Login.propTypes = {};

export default Login;
