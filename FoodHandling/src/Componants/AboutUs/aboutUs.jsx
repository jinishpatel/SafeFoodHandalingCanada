/** @format */
import './aboutus.css';
import IntoImg from '../../assets/World-Food-Safety-Day.jpg';
import Footer from '../BaseWeb/footer';
import Navbar from '../BaseWeb/navbar';

export const AboutUs = () => {
	return (
		<div>
			<Navbar />
			<div className="hero2">
				<div className="maskback">
					<img className="in-img2" src={IntoImg} alt="Intro Image"></img>
				</div>
				<div className="heading-aboutus">
					<h1>About Us</h1>
					<p>
						Safe Food Canada is a leading organization dedicated to
						ensuring the safety and quality of food across the nation. We
						are committed to protecting the health and well-being of all
						Canadians by upholding the highest standards in food safety.
					</p>
					<p>
						Our mission is to collaborate with food producers,
						manufacturers, distributors, and regulatory authorities to
						develop and implement food safety practices that safeguard
						consumers from foodborne illnesses.
					</p>
					<p>
						At Safe Food Canada, we provide educational resources,
						training, and support to the food industry. We work tirelessly
						to raise awareness about food safety and to create a food-safe
						Canada for all.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};
