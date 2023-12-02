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
import { CourseVideo } from './Componants/CourseVideo/CourseVideo';
import { useDispatch } from 'react-redux';
import { loadUserState } from './action/useraction';
import { useEffect } from 'react';

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
			<Route path="/contactus" element={<ContactUs />} />
			<Route path="/course" element={<Course />} />
			<Route path="/success" element={<CourseVideo/>} />
		</Routes>
	);
}

export default App;
