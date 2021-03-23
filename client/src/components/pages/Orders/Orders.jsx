/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import get from 'lodash/get';
import {
	Typography,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Table,
	TableHead,
} from '@material-ui/core';
import Header from '../../partials/Header';
import API from '../../../utils/api';
import './Orders.scss';

const sumReducer = (sum, orderedProduct) => (sum + (get(orderedProduct, 'quantity', 0) * get(orderedProduct, 'product.price', 0)));

const Orders = () => {
	const [orders, setOrders] = useState([]);

	const user = useSelector(
		(state) => get(state, 'currentUserReducer.user', {}),
		shallowEqual,
	);

	const getOrders = useCallback(async () => {
		const foundOrders = await API.getUserOrders();
		setOrders(foundOrders);
	}, []);

	useEffect(() => {
		if (user.userName) {
			getOrders(user.userName);
		}
	}, [getOrders, user.userName]);

	return (
		<div className="orders-page">
			<Header />
			<Typography variant="h1" className="orders-title">
				ההזמנות של
				{' '}
				{user.firstName}
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>מס' הזמנה</TableCell>
							<TableCell align="right">תאריך הזמנה</TableCell>
							<TableCell align="right">מס' מוצרים</TableCell>
							<TableCell align="right">סכום הזמנה</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order) => {
							const date = new Date(order.date);
							const dateString = date.toLocaleDateString('he-IL', {
								timeZone: 'Asia/Jerusalem',
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
							});
							const totalPrice = order.products.reduce(sumReducer, 0);

							return (
								<TableRow key={order._id}>
									<TableCell component="th" scope="row">
										{order._id}
									</TableCell>
									<TableCell align="right">{dateString}</TableCell>
									<TableCell align="right">
										{order.products.length}
									</TableCell>
									<TableCell align="right">{totalPrice}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Orders;
