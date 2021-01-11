import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./assests/css/style.css";
import "./App.css";

//importing pages
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import RightSide from "./components/pages/RightSide";

function App() {
  const [isLoginActive, setisLoginActive] = useState(true);

	return (
		<Router>
			<Route exact={true} path="/signup" component={Signup} />
			<Route exact={true} path="/login" component={Login} />
		</Router>
	);
}

export default App;
