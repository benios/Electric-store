import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

//importing pages
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = () => {

	return (
		<ThemeProvider theme={CustomTheme}>
			<StylesProvider jss={jss}>
			<BrowserRouter>
			<Switch>
			<Route exact={true} path="/">
					<Home />
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
