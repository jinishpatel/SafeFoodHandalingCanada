/** @format */

import React from 'react';
import './navbar.css';
const navbar = () => {
	return (
		<div className="navbar-container">
			<div className="mainbar">
				<div className="navbar-icon">
					<img src="https://res.cloudinary.com/dg4btcufa/image/upload/v1697056204/Safe%20Food%20Handling%20Canada/kgop012lbfzrwl7jfzj8.png" />
				</div>
				<div className="navbar-list">
					<div className="navbar-item">
						<a href="./">Home</a>
					</div>

					<div className="navbar-item">
						<a href="#">About</a>
					</div>
					<div className="navbar-item">
						<a href="#">Contact</a>
					</div>
					<div className="navbar-item">
						<a href="#">Course</a>
					</div>
					<div className="navbar-item">
						<a href="login">SignIn/Up</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default navbar;
