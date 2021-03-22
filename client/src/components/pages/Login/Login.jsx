import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
	CssBaseline, Grid, TextField, InputAdornment, Button,
} from '@material-ui/core';
import { Facebook, Person, LockOpen } from '@material-ui/icons';
import { FaGoogle } from 'react-icons/fa';
import currentUserAction from '../../../store/actions/currentUserAction';
import doesCookieExist from '../../../utils/doesCookieExist';
import API from '../../../utils/api';
import './Login.scss';

import loginImg from '../../../assests/images/logo.jpg';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	const onUsernameChange = useCallback((e) => {
		setUsername(e.target.value);
	}, []);
	const onPasswordChange = useCallback((e) => setPassword(e.target.value), []);

	const history = useHistory();

	const responseFacebook = useCallback((response) => {
		setError('');
		console.log(response);
		if (response.accessToken) {
			history.push('/');
		} else {
			setError('התחברות דרך חשבון הפייסבוק נכשלה');
		}
	}, [history]);

	const responseGoogle = useCallback((response) => {
		console.log(response.googleId);
		setError('');
		if (response.accessToken) {
			history.push('/');
		} else {
			setError('התחברות דרך חשבון הגוגל נכשלה');
		}
	}, [history]);

	const onSubmit = useCallback(async () => {
		setError('');
		const currentUser = await API.login(username, password);
		dispatch(currentUserAction(currentUser));
		const token = doesCookieExist('token');
		if (token) {
			history.goBack();
		} else {
			setError('שם משתמש או סיסמא שגויים');
		}
	}, [dispatch, history, password, username]);

	const onHome = useCallback(() => {
		history.push('/');
	}, [history]);

	return (
		<>
			<CssBaseline />
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				spacing={3}
			>
				<Grid item className="login-container">
					<Grid item className="image-container" xs={12}>
						<Button onClick={onHome}>
							<img className="image-logo" src={loginImg} alt="login" />
						</Button>
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
										<Person />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} className="login-form">
						<TextField
							label="סיסמא"
							className="text-field"
							type="password"
							value={password}
							onChange={onPasswordChange}
							error={error.length > 0}
							helperText={error.length > 0 ? error : ' '}
							InputProps={{
								startAdornment: (
									<InputAdornment className="text-field" position="start">
										<LockOpen />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} className="small-link" />
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
								appId={process.env.REACT_APP_FACEBOOK_API_KEY}
								autoLoad={false}
								callback={responseFacebook}
								render={(renderProps) => (
									<Button
										variant="contained"
										startIcon={<Facebook />}
										onClick={renderProps.onClick}
									>
										פייסבוק
									</Button>
								)}
							/>
						</Grid>

						<Grid item xs={6} className="left-button">
							<GoogleLogin
								clientId={process.env.REACT_APP_GOOGLE_API_KEY}
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
								cookiePolicy="single_host_origin"
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} className="signup-link">
						<h5>
							אין לך משתמש
							?
							<Link to="signup">הרשם כאן</Link>
						</h5>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default Login;
