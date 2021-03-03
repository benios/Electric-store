import React, { useCallback, useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import get from "lodash/get";
import logo from "../../assests/images/logo.png";
import Divider from "@material-ui/core/Divider";
import {
	InputBase,
	MenuList,
	MenuItem,
	Popover,
	Button,
	IconButton,
	Toolbar,
	AppBar,
	Badge,
} from "@material-ui/core";
import "../pages/Home/Home.scss";

//icons
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import TvIcon from "@material-ui/icons/Tv";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import PrintIcon from "@material-ui/icons/Print";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [categoryPopList, setCategoryPopList] = React.useState(null);
	const cartItems = useSelector(
		(state) => get(state, "cartReducer.cartItems", {}),
		shallowEqual
	);
	const [itemNum, setItemNum] = useState(0);
	
	useEffect(() => {
		setItemNum(cartItems.length);
	}, [cartItems]);


	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	const history = useHistory();

	const openCategorys = Boolean(categoryPopList);
	const idCategoryPop = openCategorys ? "simple-popover" : undefined;

	const onLogin = useCallback(() => {
		history.push("/login");
	}, [history]);

	const onCart = useCallback(() => {
		history.push("/cart");
	}, [history]);

	const onHome = useCallback(() => {
		history.push("/");
	}, [history]);

	const onTvCategory = useCallback(() => {
		history.push("/categories/tv");
	}, [history]);

	const onPhoneCategory = useCallback(() => {
		history.push("/categories/phone");
	}, [history]);

	const onCamCategory = useCallback(() => {
		history.push("/categories/camera");
	}, [history]);

	const onConsoleCategory = useCallback(() => {
		history.push("/categories/console");
	}, [history]);

	const onPrintCategory = useCallback(() => {
		history.push("/categories/print");
	}, [history]);

	const onCategories = (event) => {
		setCategoryPopList(event.currentTarget);
	};

	const onCategoriesClose = () => {
		setCategoryPopList(null);
	};

	const onAbout = useCallback(() => {
		history.push("/about");
	}, [history]);

	const onContact = useCallback(() => {
		history.push("/contact");
	}, [history]);

	const onSignup = useCallback(() => {
		history.push("/signup");
	}, [history]);

	const categorysMenu = (
		<Popover
			id={idCategoryPop}
			className="category-menu"
			open={openCategorys}
			anchorEl={categoryPopList}
			onClose={onCategoriesClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
		>
			<div className="user-menu-container">
				<MenuList className="menu-list">
					<MenuItem className="MenuItem" onClick={onTvCategory}>
						טלוויזיות <TvIcon fontSize="small" color="white" />
					</MenuItem>
					<Divider />
					<MenuItem className="MenuItem" onClick={onPhoneCategory}>
						פלאפונים
						<PhoneAndroidIcon fontSize="small" color="white" />
					</MenuItem>
					<Divider />
					<MenuItem className="MenuItem" onClick={onCamCategory}>
						מצלמות
						<PhotoCameraIcon fontSize="small" color="white" />
					</MenuItem>
					<Divider />
					<MenuItem className="MenuItem" onClick={onPrintCategory}>
						מדפסות
						<PrintIcon fontSize="small" color="white" />
					</MenuItem>
					<Divider />
					<MenuItem className="MenuItem" onClick={onConsoleCategory}>
						קונסולות
						<SportsEsportsIcon fontSize="small" color="white" />
					</MenuItem>
				</MenuList>
			</div>
		</Popover>
	);

	const userMenu = (
		<Popover
			id={id}
			className="user-menu"
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
		>
			<div className="user-menu-container">
				<div className="signin">
					<Button
						size="small"
						className="signin-btn login-btn"
						variant="contained"
						color="secondary"
						onClick={onLogin}
					>
						התחבר
					</Button>
					<Button
						size="small"
						className="signin-btn signup-btn"
						variant="contained"
						onClick={onSignup}
					>
						הרשם
					</Button>
				</div>
				<MenuList className="menu-list">
					<MenuItem>ההזמנות שלי</MenuItem>
				</MenuList>
			</div>
		</Popover>
	);

	const [didScroll, setDidScroll] = useState(false);

	const handleScroll = useCallback(() => {
		if (window.scrollY > 20) {
			setDidScroll(true);
		} else {
			setDidScroll(false);
		}
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<div className="root">
			<AppBar
				className={didScroll ? "appbar-style scrolled-down" : "appbar-style"}
				position="fixed"
				elevation={didScroll ? 4 : 0}
			>
				<Toolbar>
					<Button size="medium">
						<img className="logo" src={logo} onClick={onHome} alt="logo" />
					</Button>
					<Button
						size="medium"
						className="appbar-button"
						onClick={onCategories}
					>
						קטגוריות
					</Button>
					{categorysMenu}
					<Button size="medium" className="appbar-button" onClick={onAbout}>
						אודות
					</Button>
					<Button size="medium" className="appbar-button" onClick={onContact}>
						צור קשר
					</Button>
					<div className="space" />
					<div className="search-container">
						<InputBase
							placeholder="חיפוש..."
							inputProps={{ "aria-label": "search" }}
						/>
						<IconButton>
							<FiSearch />
						</IconButton>
					</div>
					<IconButton onClick={handleClick}>
						<FiUser />
					</IconButton>
					
					<IconButton onClick={onCart}>
						<Badge badgeContent={itemNum} className="badge" color="error">
							<FiShoppingCart />
						</Badge>
					</IconButton>
					
				</Toolbar>
			</AppBar>
			{userMenu}
		</div>
	);
};

export default Header;
