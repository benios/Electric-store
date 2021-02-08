import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import logo from "../../assests/images/logo.png";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import "../pages/Home/Home.scss";

//icons
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

const Header = (props) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const trigger = useScrollTrigger();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	const history = useHistory();

	const onLogin = useCallback(() => {
		history.push("/login");
	}, [history]);

	const onSignup = useCallback(() => {
		history.push("/signup");
	}, [history]);

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
	return (
			<div className="root">
				<AppBar className={trigger ? "appbar-style scrolled-down" : "appbar-style"} position="fixed" elevation={trigger ? 4 : 0}>
					<Toolbar>
						<Button size="medium">
							<img className="logo" src={logo} alt="logo" />
						</Button>
						<Button size="medium">קטגוריות</Button>
						<Button size="medium">אודות</Button>
						<Button size="medium">צור קשר</Button>
						<div className="space" />
						<IconButton>
							<FiSearch />
						</IconButton>
						<IconButton onClick={handleClick}>
							<FiUser />
						</IconButton>
						<IconButton>
							<FiShoppingCart />
						</IconButton>
					</Toolbar>
				</AppBar>
				{userMenu}
			</div>
	);
};

export default Header;
