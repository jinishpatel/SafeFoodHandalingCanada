/** @format */

import React from 'react';
import Navbar from '../BaseWeb/navbar';
import Footer from '../BaseWeb/footer';
import './courseOrder.css';
import { GrValidate } from 'react-icons/Gr';
import { TbCertificate } from 'react-icons/Tb';

const Course_Order = () => {
	const courseprice = 100;
	const pay_now = async () => {
		alert('now you will redirect to payment Gateway');
	};
	return (
		<div>
			<Navbar />
			<div className="main-order-container">
				<div className="order-container-left">
					<div>
						<div className="image-temp">
							<img src="https://res.cloudinary.com/dg4btcufa/image/upload/v1698863983/Safe%20Food%20Handling%20Canada/h7sbvgrwartxefnu2vkh.png" />
						</div>
						<div className="Course-details">
							<h2>Food Safety Licence</h2>
							<p>
								<GrValidate /> &ensp; Validity: 1 Year
							</p>
							<p>
								<TbCertificate /> &ensp;Certificate: PDF
							</p>
						</div>
					</div>
				</div>
				<div className="Order-Contaier-right">
					<div className="order">
						<h2>Order Summary</h2>
						<div className="Order-summary">
							<div className="order-sum-details">
								<p>Food Safety Licence</p>
								<p>${courseprice}</p>
							</div>
							<div className="payment-options">
								<p>Payment Options</p>
								<div className="payment-options-details">
									<div className="payment-option">
										<input type="radio" name="payment" id="payment" />
										<label htmlFor="payment">Credit Card</label>
									</div>
									<div className="payment-option">
										<input type="radio" name="payment" id="payment" />
										<label htmlFor="payment">Debit Card</label>
									</div>
									<div className="payment-option">
										<input type="radio" name="payment" id="payment" />
										<label htmlFor="payment">Paypal</label>
									</div>
								</div>
							</div>
							<div>
								<button className="paynow" onClick={pay_now}>
									Pay Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Course_Order;
