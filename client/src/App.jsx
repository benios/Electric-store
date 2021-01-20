import React, { useState , useRef} from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CustomTheme from './assests/CustomTheme';


//importing pages
import Signup from "./components/pages/Login/Signup";
import Login from "./components/pages/Login/Login";


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });



const App = () => {
	const [isLoginActive, setisLoginActive] = useState(true);

	const changeState = (event) => {
		if (isLoginActive) {
			setisLoginActive(false);
		} else {
			setisLoginActive(true);
		}
	};

	return (
		<ThemeProvider theme={CustomTheme}>
			<StylesProvider jss={jss}>
			<BrowserRouter>
				<Route exact={true} path="/login">
					<Login />
				</Route>
				<Route exact={true} path="/signup">
					<Signup />
				</Route>
		</BrowserRouter>
		</StylesProvider>
		</ThemeProvider>
		
	);
}

export default App;
