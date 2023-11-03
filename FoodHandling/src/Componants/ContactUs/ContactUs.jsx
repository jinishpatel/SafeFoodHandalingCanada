/** @format */
import './ContactUs.css';
import IntoImg from '../../assets/World-Food-Safety-Day.jpg';
import Footer from '../BaseWeb/footer';
import Navbar from '../BaseWeb/navbar';

export const ContactUs = () => {
	return (
		<div>
			<Navbar />
			<div className="contact-container">
				<h1>Contact Us</h1>
				<p>
					We'd love to hear from you. Feel free to get in touch with us
					through any of the following methods.
				</p>
				<div className="contact-details">
					<div className="contact-card">
						<h3>Email</h3>
						<p>
							<a href="mailto:jinish5597@gmail.com">
								jinish5597@gmail.com
							</a>
						</p>
					</div>
					<div className="contact-card">
						<h3>Phone</h3>
						<p>
							<a href="tel:+4165059345">+1 (416) 505-9345</a>
						</p>
					</div>
					<div className="contact-card">
						<h3>Address</h3>
						<p>121 Brunel Road</p>
						<p>Mississauga, ON</p>
						<p>Postal Code: L4Z 3E9 </p>
					</div>
				</div>
				<div className="contact-form">
					<h3>Send Us a Message</h3>
					<form>
						<div className="form-group">
							<label htmlFor="name">Your Name</label>
							<input type="text" id="name" name="name" required />
						</div>
						<div className="form-group">
							<label htmlFor="email">Your Email</label>
							<input type="email" id="email" name="email" required />
						</div>
						<div className="form-group">
							<label htmlFor="message">Message</label>
							<textarea id="message" name="message" rows="5" required />
						</div>
						<button type="submit">Send Message</button>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};
