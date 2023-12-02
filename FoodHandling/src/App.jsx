/** @format */

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Componants/homepage/home';
import Login from './Componants/Login/login';
import Register from './Componants/Register/register';
import { AboutUs } from './Componants/AboutUs/aboutUs';
import { ContactUs } from './Componants/ContactUs/ContactUs';
import Course from './Componants/Course/Course';
import { useDispatch } from 'react-redux';
import { loadUserState } from './action/useraction';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import process from 'process';
import Course_Order from './Componants/Course/courseOrder';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUserState());
	}, [dispatch]);
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/aboutus" element={<AboutUs />} />
			<Route
				path="/payment"
				stripe={stripePromise}
				element={<ContactUs />}
			/>
			<Route path="/contactus" element={<ContactUs />} />
			<Route path="/course" element={<Course />} />
			<Route path="/course/order" element={<Course_Order />} />
		</Routes>
	);
}

export default App;
