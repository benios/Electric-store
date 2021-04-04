import React, {
	useCallback, useEffect, useState, useRef,
} from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { get, debounce } from 'lodash';
import {
	Divider,
	Typography,
	MenuList,
	MenuItem,
	Popover,
	Button,
	IconButton,
	Toolbar,
	AppBar,
	Badge,
	InputBase,
} from '@material-ui/core';
import '../pages/Home/Home.scss';

// icons
import { FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import {
	Tv,
	PhoneAndroid,
	PhotoCamera,
	Print,
	SportsEsports,
} from '@material-ui/icons';
import { clearCurrentUserAction } from '../../store/actions/currentUserAction';
import doesHttpOnlyCookieExist from '../../utils/doesCookieExist';
import logo from '../../assests/images/logo.png';
import API from '../../utils/api';

const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [categoryPopList, setCategoryPopList] = useState(null);
	const [token, setToken] = useState(false);
	const [products, setProducts] = useState([]);
	const [display, setDisplay] = useState(false);
	const [query, setQuery] = useState('');

	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector(
		(state) => get(state, 'currentUserReducer.user', {}),
		shallowEqual,
	);

	const cartItems = useSelector(
		(state) => get(state, 'cartReducer.cartItems', {}),
		shallowEqual,
	);
	const [itemNum, setItemNum] = useState(0);

	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setDisplay(false);
				}
			}
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	}

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	useEffect(() => {
		if (doesHttpOnlyCookieExist('token')) {
			setToken(true);
		} else {
			setToken(false);
		}
	}, []);

	useEffect(() => {
		setItemNum(cartItems.length);
	}, [cartItems]);

	const handleClick = (event) => {
		if (!token) {
			history.push('/login');
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const openCategorys = Boolean(categoryPopList);
	const idCategoryPop = openCategorys ? 'simple-popover' : undefined;

	const onLogout = useCallback(() => {
		API.logout();
		setAnchorEl(null);
		setToken(false);
		dispatch(clearCurrentUserAction());
	}, [dispatch]);

	const onOrders = useCallback(() => {
		history.push('/orders');
	}, [history]);

	const onCart = useCallback(() => {
		history.push('/cart');
	}, [history]);

	const onHome = useCallback(() => {
		history.push('/');
	}, [history]);

	const onTvCategory = useCallback(() => {
		history.push('/categories/tv');
	}, [history]);

	const onPhoneCategory = useCallback(() => {
		history.push('/categories/phone');
	}, [history]);

	const onCamCategory = useCallback(() => {
		history.push('/categories/camera');
	}, [history]);

	const onConsoleCategory = useCallback(() => {
		history.push('/categories/console');
	}, [history]);

	const onPrintCategory = useCallback(() => {
		history.push('/categories/print');
	}, [history]);

	const onCategories = (event) => {
		setCategoryPopList(event.currentTarget);
	};

	const onCategoriesClose = () => {
		setCategoryPopList(null);
	};

	const onAbout = useCallback(() => {
		history.push('/about');
	}, [history]);

	const onContact = useCallback(() => {
		history.push('/contact');
	}, [history]);

	const onProduct = (productId, views) => {
		API.viewsUpdate(productId, views);
		history.push(`/products/${productId}`);
	};

	const onSearch = useCallback(() => {
		const getProducts = async () => {
			if (query === '') {
				setProducts([]);
				setDisplay(false);
			}	else	{
				setProducts(await API.searchProduct(query));
			}
		};
		getProducts();
	}, [query]);

	const delayedQuery = debounce(onSearch, 3000);

	const onQueryChange = useCallback((event) => {
		setProducts([]);
		setDisplay(true);
		setQuery(event.target.value);
	}, []);

	useEffect(() => {
		delayedQuery();
		return delayedQuery.cancel;
	}, [query, delayedQuery]);

	const categorysMenu = (
		<Popover
			id={idCategoryPop}
			className="category-menu"
			open={openCategorys}
			anchorEl={categoryPopList}
			onClose={onCategoriesClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<div className="user-menu-container">
				<MenuList className="menu-list">
					<MenuItem className="MenuItem" onClick={onTvCategory}>
						טלוויזיות
						<Tv fontSize="small" />
					</MenuItem>
					<Divider />
					<MenuItem className="MenuItem" onClick={onPhoneCategory}>
						פלאפונים
						<PhoneAndroid fontSize="small" />
					</MenuItem>
					<Divider />
					<MenuItem className="MenuItem" onClick={onCamCategory}>
						מצלמות
						<PhotoCamera fontSize="small" />
					</MenuItem>
					<Divider />
					<MenuItem className="MenuItem" onClick={onPrintCategory}>
						מדפסות
						<Print fontSize="small" />
					</MenuItem>
					<Divider />
					<MenuItem className="MenuItem" onClick={onConsoleCategory}>
						קונסולות
						<SportsEsports fontSize="small" />
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
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<div className="user-menu-container">
				<div className="signin">
					<div className="profile">
						<FaUserCircle className="user-icon" />
						<Typography variant="h5" className="user-txt">
							{user.firstName}
							{' '}
							{user.lastName}
						</Typography>
						<Typography className="user-txt">{user.userName}</Typography>
					</div>
					<Button onClick={onOrders} className="order-btn" variant="contained">ההזמנות שלי</Button>
					<Button
						className="order-btn"
						variant="contained"
						onClick={onLogout}
					>
						התנתק
					</Button>
				</div>
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
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return (
		<div className="header-container">
			<AppBar
				className={didScroll ? 'appbar-style scrolled-down' : 'appbar-style'}
				position="fixed"
				elevation={didScroll ? 4 : 0}
			>
				<Toolbar>
					<Button size="medium" onClick={onHome}>
						<img className="logo" src={logo} alt="logo" />
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
							className="search-field"
							placeholder="חיפוש..."
							onChange={onQueryChange}
							value={query}
							inputProps={{ 'aria-label': 'naked' }}
						/>
						<IconButton disabled>
							<FiSearch />
						</IconButton>
					</div>
					{display && (
						<div className="autoContainer">
							{products.length === 0
								? (
									<div className="product">
										<p>מחפש...</p>
									</div>
								)
								:	products.map((product) => (
									<div ref={wrapperRef}>
										<Button className="product" onClick={() => onProduct(product._id, product.views)}>
											<img src={product.pictureUrl} alt={product.name} className="product-img" />
											<span>{product.name}</span>
										</Button>
										<Divider />
									</div>
								))}
						</div>
					)}
					{token
						? <IconButton className="loggedin-btn" onClick={handleClick}>{`${user.firstName.split('')[0]}${user.lastName.split('')[0]}`}</IconButton>
						: (
							<IconButton onClick={handleClick}>
								<FiUser />
							</IconButton>
						)}
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
