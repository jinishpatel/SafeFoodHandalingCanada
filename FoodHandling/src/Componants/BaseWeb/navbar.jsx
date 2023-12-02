/** @format */

import React, { useEffect } from 'react';
import './navbar.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const navbar = () => {
	const navigate = useNavigate();
	const isUserLoggedIn = Cookies.get('userData');

	const handleLogOut = () => {
		console.log('logout');
		Cookies.remove('userData');
		window.location.href = '/';
	};
	return (
		<div className="navbar-container">
			<div className="mainbar">
				<div className="navbar-icon">
					<img src="https://res.cloudinary.com/dg4btcufa/image/upload/v1697056204/Safe%20Food%20Handling%20Canada/kgop012lbfzrwl7jfzj8.png" />
				</div>
				<div className="navbar-list">
					<div className="navbar-item">
						<a href="/">Home</a>
					</div>

					<div className="navbar-item">
						<a href="/aboutus">About</a>
					</div>
					<div className="navbar-item">
						<a href="/contactus">Contact</a>
					</div>
					<div className="navbar-item">
						<a href="/course">Course</a>
					</div>
					<div className="navbar-item">
						{isUserLoggedIn ? (
							<a onClick={handleLogOut}>Logout</a>
						) : (
							<a href="/login">Login</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default navbar;
