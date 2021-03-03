import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./ProductCard.scss";

const Productcard = ({ productId, img, price, title, alt }) => {
	const history = useHistory();

	const onProduct = () =>{
		history.push(`/products/${productId}`);
	};
	
	return (
		<Card className="product-card" onClick={onProduct}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt={alt}
					height="140"
					image={img}
					title={alt}
				/>
				<CardContent className="card-content">
					<Typography gutterBottom variant="h5" component="h2" >
						{title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{`₪${price}`}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className="card-actions">
				<Button size="small" variant="contained" color="primary">
					הוסף לסל
				</Button>
			</CardActions>
		</Card>
	);
};

Productcard.propTypes = {
	productId: PropTypes.number.isRequired,
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	alt: PropTypes.string.isRequired,
};

export default Productcard;
