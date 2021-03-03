import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset, ThemeProvider } from "@material-ui/core/styles";
import CustomTheme from "./assests/CustomTheme";
import configureStore from "./store/configureStore";

//importing pages
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Categories from "./components/pages/Categories/Categories";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import Product from "./components/pages/Product/Product";
import Cart from "./components/pages/Cart/Cart";
import Orders from "./components/pages/Orders/Orders";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

//Configure store
const { store, persistor } = configureStore();

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
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
								<Route path="/categories/:category">
									<Categories />
								</Route>
								<Route exact={true} path="/about">
									<About />
								</Route>
								<Route exact={true} path="/contact">
									<Contact />
								</Route>
								<Route exact={true} path="/products/:productId">
									<Product />
								</Route>
								<Route exact={true} path="/cart">
									<Cart />
								</Route>
								<Route exact={true} path="/orders">
									<Orders />
								</Route>
							</Switch>
						</BrowserRouter>
					</StylesProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
