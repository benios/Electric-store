import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CustomTheme from './assests/CustomTheme';

//importing pages
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = () => {

	return (
		<ThemeProvider theme={CustomTheme}>
			<StylesProvider jss={jss}>
			<BrowserRouter>
			<Switch>
			<Route exact={true} path="/">
					<h1>hello</h1>
				</Route>
				<Route exact={true} path="/login">
					<Login />
				</Route>
				<Route exact={true} path="/signup">
					<Signup />
				</Route>
			</Switch>
		</BrowserRouter>
		</StylesProvider>
		</ThemeProvider>
		
	);
}

export default App;
