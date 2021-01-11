import React from "react";

import loginImg from "./../../assests/images/login.png";

function Signup(props) {
	return (
		<div className="base-container" dir="rtl" >
			<div className="header">הרשם</div>
			<div className="content">
				<div className="image">
					<img src={loginImg} />
				</div>
				<div className="form">
						<div className="form-group">
							<label for="username">שם משתמש</label>
							<input
								dir="rtl"
								type="text"
								id="username"
								placeholder="שם משתמש"
							></input>
						</div>
						<div className="form-group">
							<label for="userPassword">סיסמא</label>
							<input
								dir="rtl"
								type="password"
								id="userPassword"
								placeholder="סיסמא"
							></input>
						</div>
						<div className="form-group">
							<label for="userPasswordAgain">סיסמא(שוב)</label>
							<input
								dir="rtl"
								type="password"
								id="userPasswordAgain"
								placeholder="סיסמא"
							></input>
						</div>
						<div className="form-group">
							<label for="firstname">שם פרטי</label>
							<input
								dir="rtl"
								type="text"
								id="firstname"
								placeholder="שם פרטי"
							></input>
						</div>
						<div className="form-group">
							<label for="lastname">שם משפחה</label>
							<input
								dir="rtl"
								type="text"
								id="lastname"
								placeholder="שם משפחה"
							></input>
						</div>
						<div className="form-group">
							<label for="address">כתובת</label>
							<input
								dir="rtl"
								type="text"
								id="address"
								placeholder="כתובת"
							></input>
						</div>
						<div className="form-group">
							<label for="age">גיל</label>
							<input dir="rtl" type="number" id="age" placeholder="גיל"></input>
						</div>
					<div className="footer">
						<button type="button" className="btn">
							הרשם
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
