import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import {
	Typography,
	FormControl,
	OutlinedInput,
	CardMedia,
	Popover,
	Fade,
	IconButton,
} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import API from '../../../utils/api';
import doesCookieExist from '../../../utils/doesCookieExist';
import './Product.scss';

import loginImg from '../../../assests/images/logo.jpg';

import cartAction from '../../../store/actions/cartAction';
import Header from '../../partials/Header';

const Product = () => {
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(0);
	const [error, setError] = useState('');
	const [isSigned, setIsSigned] = useState(false);

	const dispatch = useDispatch();

	const { productId } = useParams();

	const history = useHistory();

	useEffect(() => {
		const getProducts = async () => {
			setProduct(await API.getProductById(productId));
		};
		if (productId) {
			getProducts();
		}
	}, [productId]);

	const handleClose = () => {
		setIsSigned(false);
	};

	const onHome = useCallback(() => {
		history.push('/');
	}, [history]);

	const onLogin = useCallback(() => {
		history.push('/login');
	}, [history]);

	const open = isSigned;
	const id = open ? 'simple-popover' : undefined;

	const notSigned = (
		<Popover
			id={id}
			className="product-popover"
			open={open}
			anchorEl={isSigned}
			onClose={handleClose}
			anchorReference="anchorPosition"
			anchorPosition={{ top: 200, left: 700 }}
		>
			<Fade in={open}>
				<Grid item className="popover-container">
					<IconButton
						onClick={handleClose}
						className="close-btn"
					>
						<AiOutlineClose />
					</IconButton>
					<Button onClick={onHome} className="home-btn">
						<img className="image-logo" src={loginImg} alt="login" />
					</Button>
					<Typography variant="h5" className="text">
						עליך להתחבר לאתר על מנת לבצע הזמנה
					</Typography>
					<Button
						size="small"
						className="login-btn"
						variant="contained"
						onClick={onLogin}
					>
						התחבר
					</Button>
					<h5>
						אין לך משתמש
						?
						<Link to="../signup">הרשם כאן</Link>
					</h5>
				</Grid>
			</Fade>
		</Popover>
	);

	const onQuantityChange = useCallback(
		(e) => {
			if (+e.target.value > product.quantity) {
				setError(
					`הכמות שבחרת לא נמצאת כרגע בחנות אתה יכול לבחור עד ל${product.quantity} יחידות`,
				);
				setQuantity(product.quantity);
			} else {
				setQuantity(+e.target.value);
			}
		},
		[product.quantity],
	);

	const onQuantityAdd = useCallback(() => {
		let val = quantity;
		if (quantity < product.quantity) {
			val = quantity + 1;
		}
		setQuantity(val);
	}, [product.quantity, quantity]);

	const onQuantitySubtract = useCallback(() => {
		let val = quantity;
		if (quantity >= 0) {
			val = quantity - 1;
		}
		setQuantity(val);
	}, [quantity]);

	const onAddToCart = useCallback(() => {
		if (doesCookieExist('token')) {
			dispatch(cartAction(product, quantity));
		} else {
			setIsSigned(true);
		}
	}, [dispatch, product, quantity]);

	return (
		<div className="product-page">
			<Header />
			<Grid
				container
				direction="row"
				alignItems="center"
				justify="center"
				className={open ? 'blurred' : null}
			>
				<Grid item md={6} className="right-side">
					<Typography variant="h1" className="title" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="h5" className="price">
						{product.price}
						.00 ₪
					</Typography>
					<Typography variant="subtitle1" className="description">
						{product.description}
					</Typography>
					<Grid container direction="row" className="add-to-cart-container">
						<Typography variant="subtitle1" className="choose-quantity">
							בחר כמות:
						</Typography>
						<div className="space-small" />
						<Button
							variant="outlined"
							size="small"
							className="add-btn"
							onClick={onQuantityAdd}
						>
							+
						</Button>
						<FormControl
							fullWidth
							className="quantity"
							variant="outlined"
							color="primary"
						>
							<OutlinedInput
								type="text"
								value={quantity}
								onChange={onQuantityChange}
							/>
						</FormControl>
						<Button
							variant="outlined"
							size="small"
							className="add-btn"
							onClick={onQuantitySubtract}
						>
							-
						</Button>
						<div className="space" />
					</Grid>
					<Typography variant="subtitle1" className="error-msg">
						{error}
					</Typography>
					<Button
						variant="contained"
						className="add-to-cart"
						onClick={onAddToCart}
					>
						הוסף לסל
					</Button>
				</Grid>
				<Grid item md={6} className="left-side">
					<CardMedia
						component="img"
						alt={product.name}
						image={product.pictureUrl}
						title={product.name}
					/>
				</Grid>
			</Grid>
			{notSigned}
		</div>
	);
};

export default Product;
