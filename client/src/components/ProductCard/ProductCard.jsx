import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./ProductCard.scss";

const Productcard = ({ img, price, title }) => {
	return (
		<Card className="product-card">
			<CardActionArea>
				<CardMedia
					component="img"
					alt="tv"
					height="140"
					image={img}
					title="tv"
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
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
};

export default Productcard;
