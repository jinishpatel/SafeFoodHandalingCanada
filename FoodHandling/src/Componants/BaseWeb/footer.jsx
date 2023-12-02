/** @format */

import React from 'react';
import './footer.css';
const footer = () => {
	return (
		<div className="footer-container">
			<div className="footer-left">
				<img src="https://res.cloudinary.com/dg4btcufa/image/upload/v1697056204/Safe%20Food%20Handling%20Canada/xthijz9rfl0dvgvynkne.png" />
			</div>
			<div className="footer-right">
				<div className="footer-right-left">
					<h2>Products</h2>
					<ul>
						<li>
							<a href="#"> Safety Certificate</a>
						</li>
						<li>
							<a href="#">Full Course</a>
						</li>
						<li>
							<a href="#">Quick Course</a>
						</li>
						<li>
							<a href="#">Examination</a>
						</li>
					</ul>
				</div>
				<div className="footer-right-middle">
					<h2>Company</h2>
					<ul>
						<li>
							<a href="#"> About us</a>
						</li>
						<li>
							<a href="#">Customers</a>
						</li>
						<li>
							<a href="#">Events</a>
						</li>
						<li>
							<a href="#">Partners</a>
						</li>
					</ul>
				</div>
				<div className="footer-right-right">
					<h2>Contact Us</h2>
					<ul>
						<li>
							<a href="#">Technical Support</a>
						</li>
						<li>
							<a href="#">Education and Training</a>
						</li>
						<li>
							<a href="#"></a>
						</li>
						<li>
							<a href="#">Facebook |</a>
							<a href="#"> Instagram |</a>
							<a href="#"> Twitter</a>
							<a href="#"> Jinish</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default footer;
