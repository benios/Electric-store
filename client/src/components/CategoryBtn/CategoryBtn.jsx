import React from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TvIcon from "@material-ui/icons/Tv";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import PrintIcon from "@material-ui/icons/Print";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./CategoryBtn.scss";

const Categorybtn = () => {
	return (
		<Grid container className="category-btn-group" direction="row">
				<Button className="category-btn">
					<TvIcon fontSize="large" color="primary" />
          <Typography variant="button" display="block" gutterBottom>
					  טלוויזיות
				  </Typography>
          <ExpandMoreIcon fontSize="small" color="primary"/>
				</Button>
			<Divider orientation="vertical" flexItem />
			<Button className="category-btn">
				<PhoneAndroidIcon
					fontSize="large"
					color="primary"
					classes={"category-btn"}
				/>
        <Typography variant="button" display="block" gutterBottom>
					  פלאפונים
				  </Typography>
          <ExpandMoreIcon fontSize="small" color="primary"/>
			</Button>
			<Divider orientation="vertical" flexItem />
			<Button className="category-btn">
				<PhotoCameraIcon
					fontSize="large"
					color="primary"
					classes={"category-btn"}
				/>
        <Typography variant="button" display="block" gutterBottom>
					  מצלמות
				  </Typography>
          <ExpandMoreIcon fontSize="small" color="primary"/>
			</Button>
			<Divider orientation="vertical" flexItem />
			<Button className="category-btn">
				<PrintIcon fontSize="large" color="primary" classes={"category-btn"} />
        <Typography variant="button" display="block" gutterBottom>
					  מדפסות
				  </Typography>
          <ExpandMoreIcon fontSize="small" color="primary"/>
			</Button>
			<Divider orientation="vertical" flexItem />
			<Button className="category-btn">
				<SportsEsportsIcon
					fontSize="large"
					color="primary"
					classes={"category-btn"}
				/>
        <Typography variant="button" display="block" gutterBottom>
					  קונסולות
				  </Typography>
          <ExpandMoreIcon fontSize="small" color="primary"/>
			</Button>
		</Grid>
	);
};

export default Categorybtn;
