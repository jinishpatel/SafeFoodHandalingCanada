/** @format */

import './Course.css';

import React from 'react';
import Navbar from '../BaseWeb/navbar';
import Footer from '../BaseWeb/footer';
import { GiCheckMark, GiDuration } from 'react-icons/gi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { LuLanguages } from 'react-icons/Lu';
import { RiPresentationLine } from 'react-icons/ri';
import { TbCertificate } from 'react-icons/Tb';
import { SlGraduation } from 'react-icons/Sl';
import { MdOutlinePriceChange } from 'react-icons/Md';
import { GrScorecard, GrValidate } from 'react-icons/Gr';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Course = () => {
	const navigate = useNavigate();
	const { isauthenticated } = useSelector((state) => state.user);
	console.log(isauthenticated);
	const purchase_action = () => {
		if (isauthenticated) {
			console.log(isauthenticated);
			navigate('/course/order');
		} else {
			navigate('/login');
		}
	};
	return (
		<div>
			<Navbar />
			<div className="Main-Course-container">
				<div className="main-course-part1">
					<div className="part1-left">
						<Carousel>
							<div>
								<img src="https://res.cloudinary.com/dg4btcufa/image/upload/v1698863983/Safe%20Food%20Handling%20Canada/h7sbvgrwartxefnu2vkh.png" />
							</div>
							<div>
								<img src="https://res.cloudinary.com/dg4btcufa/image/upload/v1698863983/Safe%20Food%20Handling%20Canada/kntpgackspmyixaahhqm.webp" />
							</div>
							<div>
								<img src="https://res.cloudinary.com/dg4btcufa/image/upload/v1698864194/Safe%20Food%20Handling%20Canada/f6nzdww6yzi6uey1tvqm.png" />
							</div>
						</Carousel>
					</div>
					<div className="part1-right">
						<h2>Food Safety Licence</h2>
						<p>
							<GrValidate /> &ensp; Validity: 1 Year
						</p>
						<p>
							<MdOutlinePriceChange />
							&ensp; Price: $100
						</p>
						<p>
							<GiDuration />
							&ensp; Duration: 4 HoursSlGraduation
						</p>
						<p>
							<LuLanguages />
							&ensp; Language: English
						</p>
						<p>
							<RiPresentationLine /> &ensp;Type: Online
						</p>
						<p>
							<TbCertificate /> &ensp;Certificate: PDF
						</p>
						<p>
							<SlGraduation />
							&ensp; Exam: 30 Questions
						</p>
						<p>
							<GrScorecard />
							&ensp; Passing Score: 70%
						</p>
						<p>
							<GiCheckMark />
							&ensp; Government Approved
						</p>
						<button className="purchase-button" onClick={purchase_action}>
							Buy Now
						</button>
					</div>
				</div>
				<div className="main-course-part2">
					<h1>Course Overview:</h1>
					<p>
						Our program provides a deep dive into various critical aspects
						of food safety, including:
					</p>
					<ul>
						<li>
							<strong>Introduction to Food Safety:</strong>
							<br /> Gain a profound understanding of the pivotal role
							food safety plays in safeguarding public health and delve
							into the intricate regulatory framework that governs food
							safety in Canada.
						</li>
						<li>
							<strong>Microorganisms and Contamination:</strong> <br />
							Explore the realm of common foodborne pathogens, their
							sources, and the strategies to eliminate contamination
							risks.
						</li>
						<li>
							<strong>Personal Hygiene:</strong>
							<br /> Master the art of maintaining impeccable personal
							hygiene to mitigate the possibility of cross-contamination.
						</li>
						<li>
							<strong>Safe Food Handling:</strong> <br />
							Acquire insights into the proper techniques for food
							storage, preparation, and cooking that ensure both safety
							and nutritional value.
						</li>
						<li>
							<strong>Cleaning and Sanitizing:</strong> <br />
							Learn the science of maintaining a pristine kitchen
							environment, equipped with tools and practices that nullify
							the threat of foodborne illnesses.
						</li>
						<li>
							<strong>
								Hazard Analysis and Critical Control Points (HACCP):
							</strong>
							<br /> Embrace HACCP principles and understand their
							implementation for assuring food safety.
						</li>
						<li>
							<strong>Legislation and Regulation:</strong> <br />
							Navigate through the intricate web of Canadian food safety
							laws and regulations that demand adherence and compliance
							from businesses in the food industry.
						</li>
						<li>
							<strong>Food Allergens:</strong> <br />
							Comprehend the dangers associated with food allergens and
							gain mastery over their effective management.
						</li>
						<li>
							<strong>Food Safety Management Systems:</strong>
							<br /> Explore various food safety management systems and
							learn the art of their seamless implementation.
						</li>
					</ul>

					<h2>Course Features:</h2>
					<ul>
						<li>Engaging and interactive lessons.</li>
						<li>Real-life case studies and examples.</li>
						<li>Practical demonstrations and self-assessment quizzes.</li>
						<li>
							Access to a wealth of downloadable resources and valuable
							reference materials.
						</li>
						<li>
							Expert guidance and unwavering support from seasoned
							certified instructors.
						</li>
					</ul>

					<h2>Certification:</h2>
					<p>
						Completion of this course bestows upon you the prestigious
						Food Safety Handling Canada certification. This emblem of
						distinction underscores your unwavering commitment to
						upholding the highest standards of food safety. Recognized
						nationwide, this certification carries significant weight in
						the food industry, making it an invaluable asset to your
						professional journey.
					</p>

					<h2>Intended Audience:</h2>
					<ul>
						<li>Restaurant and foodservice personnel</li>
						<li>Food business proprietors and operators</li>
						<li>Culinary enthusiasts and home chefs</li>
						<li>Those driven to elevate their food safety knowledge</li>
					</ul>

					<p>
						Embrace the gold standard of food safety practices in Canada.
						Enroll in the Food Safety Handling Canada course today and
						embark on a transformative journey toward excellence in food
						safety and handling.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Course;
