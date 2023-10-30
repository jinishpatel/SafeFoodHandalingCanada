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

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/aboutus" element={<Register />} />
			<Route path="/contactus" element={<Register />} />
		</Routes>
	);
}

export default App;
