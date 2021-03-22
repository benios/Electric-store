import React, {
	useEffect, useState, useCallback, useRef,
} from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
	useParams,
} from 'react-router';
import get from 'lodash/get';
import {
	Container, Grid, Fab, Button, Dialog, DialogTitle,
	DialogContent, TextField, DialogActions, InputAdornment,
} from '@material-ui/core';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { FaPlus, FaUndo, FaSave } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../partials/Header';
import ProductCard from '../../ProductCard/ProductCard';
import CategoryTitle from '../../partials/CategoryTitle/CategoryTitle';
import API from '../../../utils/api';
import useWindowDimensions from '../../../assests/hooks/useWindowDimensions';
import './Categories.scss';

const Categories = () => {
	const title = useParams();
	const [products, setProducts] = useState([]);
	const [open, setOpen] = useState(false);
	// Add new product credentials
	const [name, setName] = useState('');
	const onNameChange = useCallback((e) => setName(e.target.value), []);
	const [price, setPrice] = useState('');
	const onPriceChange = useCallback((e) => setPrice(+e.target.value), []);
	const [quantity, setQuantity] = useState('');
	const onQuantityChange = useCallback((e) => setQuantity(+e.target.value), []);
	const [pictureUrl, setPictureUrl] = useState('');
	const onPictureUrlChange = useCallback((e) => setPictureUrl(e.target.value), []);
	const [description, setDescription] = useState('');
	const onDescriptionChange = useCallback((e) => setDescription(e.target.value), []);

	const { width } = useWindowDimensions();
	const ref = useRef(null);
	const scroll = useCallback((isNegative) => {
		const operator = isNegative ? -1 : 1;
		ref.current.scrollLeft += (width * operator) / 2;
	}, [width]);

	const scrollRight = () => { scroll(false); };
	const scrollLeft = () => { scroll(true); };
	useEffect(() => {
		const getProducts = async () => {
			setProducts(await API.getProductByCategory(title.category));
		};
		if (title.category) {
			getProducts();
		}
	}, [title.category]);

	const user = useSelector(
		(state) => get(state, 'currentUserReducer.user', {}),
		shallowEqual,
	);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const success = (msg) => toast(msg);
	const error = () => toast('Error!');

	const onAdd = useCallback(async () => {
		let response;
		try {
			response = await API.createProduct(
				name, price, title.category, quantity, pictureUrl, description,
			);
		} catch (err) {
			error();
		}
		success(response);
		handleClose();
	}, [description, name, pictureUrl, price, quantity, title.category]);

	const onClear = useCallback(async () => {
		setName('');
		setPrice('');
		setQuantity('');
		setPictureUrl('/img/products/upload-img.png');
		setDescription('');
	}, []);

	return (
		<div className="category-page">
			<Header />
			<CategoryTitle title={title.category} />
			{user.role === 'Admin'
				? (
					<Button size="medium" variant="contained" className="new-product-btn" onClick={handleClickOpen}>
						הוסף מוצר חדש
						<FaPlus />
					</Button>
				)
				: null}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title" className="popover-title">הוספת מוצר חדש</DialogTitle>
				<DialogContent className="dialog-container">
					<Grid container className="text-field-container">
						<TextField
							id="standard-helperText"
							label="שם"
							className="dialog-txt-field"
							value={name}
							onChange={onNameChange}
							variant="filled"
						/>
						<TextField
							id="standard-helperText"
							label="כתובת תמונה(url)"
							className="dialog-txt-field"
							value={pictureUrl}
							onChange={onPictureUrlChange}
							variant="filled"
						/>
						<TextField
							id="standard-helperText"
							label="מחיר"
							className="dialog-txt-field"
							value={price}
							onChange={onPriceChange}
							variant="filled"
							InputProps={{
								endAdornment: <InputAdornment className="input-text" position="end">₪</InputAdornment>,
							}}
						/>
						<TextField
							id="standard-helperText"
							label="כמות"
							className="dialog-txt-field"
							value={quantity}
							onChange={onQuantityChange}
							variant="filled"
							type="number"
						/>
					</Grid>
					<TextField
						id="standard-helperText"
						label="תאור"
						className="dialog-txt-field"
						value={description}
						onChange={onDescriptionChange}
						variant="filled"
						multiline
						rows={4}
					/>
				</DialogContent>
				<DialogActions className="btn-container">
					<Button onClick={onClear} variant="contained" className="btn clear">
						נקה
						<FaUndo />
					</Button>
					<Button onClick={onAdd} variant="contained" color="primary" className="btn add">
						הוסף מוצר
						<FaSave />
					</Button>
				</DialogActions>
			</Dialog>
			<ToastContainer />
			{	width > 600 ? (
				<Grid container className="grid-container" spacing={2}>
					{products.map((product) => (
						<Grid className="card-container" key={product._id} item xs={12} lg={2} md={4} sm={5}>
							<ProductCard
								productId={product._id}
								img={product.pictureUrl}
								price={product.price}
								title={product.name}
								alt={title.category}
								views={product.views}
							/>
						</Grid>
					))}
				</Grid>
			)
				: (
					<Container maxWidth={false} className="hot-products-container">
						<Grid item xs={12} className="scroll-btn">
							<Fab onClick={scrollRight} className="scroll-btn-right" color="secondary" size="medium">
								<AiOutlineRight />
							</Fab>
							<Fab onClick={scrollLeft} className="scroll-btn-left" color="secondary" size="medium">
								<AiOutlineLeft />
							</Fab>
						</Grid>
						<Grid container className="products-slider" ref={ref} spacing={3}>
							{products.map((product) => (
								<Grid className="card-container" item xs={12} lg={3} md={4} sm={5} key={product._id}>
									<ProductCard
										productId={product._id}
										img={product.pictureUrl}
										price={product.price}
										title={product.name}
										alt={title.category}
										views={product.views}
									/>
								</Grid>
							))}
						</Grid>
					</Container>
				)}
		</div>
	);
};

export default Categories;
