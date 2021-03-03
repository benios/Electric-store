import React, { useState, useEffect, useCallback } from "react";
import Header from "../../partials/Header";
import { useDispatch } from "react-redux";
import cartAction from "../../../store/actions/cartAction";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router";
import { Typography, FormControl, OutlinedInput, CardMedia } from "@material-ui/core";
import API from "../../../utils/api";
import "./Product.scss";

const Product = () => {
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(0);
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	const { productId } = useParams();

	useEffect(() => {
		const getProducts = async () => {
			setProduct(await API.getProductById(productId));
		};
		if (productId) {
			getProducts();
		}
	}, [productId]);

	const onQuantityChange = useCallback(
		(e) => {
			if (+e.target.value > product.quantity) {
				setError(
					`הכמות שבחרת לא נמצאת כרגע בחנות אתה יכול לבחור עד ל${product.quantity} יחידות`
				);
				setQuantity(product.quantity);
			} else {
				setQuantity(+e.target.value);
			}
		},
		[product.quantity]
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
		dispatch(cartAction(product, quantity));
	},[dispatch, product, quantity]);



	return (
		<div className="product-page">
			<Header />
			<Grid container direction="row" alignItems="center" justify="center">
				<Grid item md={6} className="right-side">
					<Typography
						variant="h1"
						className="title"
						color="primary"
						gutterBottom
					>
						{product.name}
					</Typography>
					<Typography variant="h5" color="secondary" className="price">
						{product.price}.00 ₪
					</Typography>
					<Typography variant="subtitle1" className="description">
						{product.description}
					</Typography>
					<Grid container direction="row" className="add-to-cart-container">
						<Typography variant="subtitle1" className="choose-quantity">
							בחר כמות:
						</Typography>
						<div className="space-small"></div>
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
						<div className="space"></div>
					</Grid>
					<Typography variant="subtitle1" className="error-msg">
						{error}
					</Typography>
					<Button variant="contained" color="primary" className="add-to-cart" onClick={onAddToCart}>
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
		</div>
	);
};


export default Product;
