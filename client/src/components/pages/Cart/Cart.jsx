import React, { useEffect, useState } from "react";
import get from "lodash/get";
import API from "../../../utils/api";
import Header from "../../partials/Header";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import useWindowDimensions from "../../../assests/hooks/useWindowDimensions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {clearCartAction} from "../../../store/actions/cartAction";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";
import "./Cart.scss";

const DELIVERY_COST = 15;

const Cart = () => {
	const [sum, setSum] = useState(0);
	const { width } = useWindowDimensions();
	const dispatch = useDispatch();
	const cartItems = useSelector(
		(state) => get(state, "cartReducer.cartItems", {}),
		shallowEqual
	);
	const user = useSelector(
		(state) => get(state, "currentUserReducer.user", {}),
		shallowEqual
	);

	useEffect(() => {
		const totalSum = cartItems.reduce((totalPrice, cartItem) => {
			return (
				totalPrice +
				get(cartItem, "product.price", 0) * get(cartItem, "quantity", 0)
			);
		}, 0);
		setSum(totalSum);
	}, [cartItems]);

	const onSubmit = () => {
		API.createOrder(user.userName, cartItems);
		dispatch(clearCartAction());
	};

	return (
		<div>
			<Header />
			<Grid
				container
				direction="row"
				alignItems="flex-start"
				justify="center"
				className="cart-page"
			>
				<Grid item md={12}>
					<Typography variant="h1" className="title">
						העגלה שלך
					</Typography>
				</Grid>
				<Grid
					container
					direction="row"
					alignItems="flex-start"
					justify="center"
					className="table-container"
					spacing={1}
				>
					<Grid item md={8} className="right-side">
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>מוצר</TableCell>
										{width > 550 ? <TableCell></TableCell> : null}
										<TableCell>מחיר</TableCell>
										<TableCell>כמות</TableCell>
										<TableCell>מחיר כולל</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{cartItems.map((cartItem) => {
										return (
											<TableRow key={cartItem.product._id}>
												{width > 550 ? (
													<TableCell>
														<img
															src={cartItem.product.pictureUrl}
															alt={cartItem.product.name}
														/>
													</TableCell>
												) : null}
												<TableCell>{cartItem.product.name}</TableCell>
												<TableCell>{`${cartItem.product.price} ₪`}</TableCell>
												<TableCell>{cartItem.quantity}</TableCell>
												<TableCell>
													{`${cartItem.product.price * cartItem.quantity} ₪`}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item md={4} className="left-side">
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>סיכום ההזמנה</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>סכום</TableCell>
										<TableCell>{`${sum} ₪`}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>משלוח</TableCell>
										<TableCell>{`${DELIVERY_COST} ₪`}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>סכום כולל</TableCell>
										<TableCell>{`${sum + DELIVERY_COST} ₪`}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
						<Button className="order-btn" onClick={onSubmit}>בצע הזמנה</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Cart;
