/** @format */

import React, { useEffect } from 'react';
import Footer from '../BaseWeb/footer';
import Navbar from '../BaseWeb/navbar';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import your CSS styles
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineMail } from 'react-icons/ai';
import { PiPasswordBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login_action } from '../../action/useraction';
import Cookies from 'js-cookie';
const login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setuser] = useState({
		email: '',
		password: '',
	});
	useEffect(() => {
		const isUserLoggedIn = Cookies.get('userData');
		if (isUserLoggedIn) {
			navigate('/'); // Redirect to home page if user is already logged in.
		} else {
			navigate('/login');
		}
	}, [navigate]);
	// const { error, loading, isAuthenticated } = useSelector(
	// 	(state) => state.user,
	// );
	// const { email, password } = user; // Move this line inside the component

	const loginSubmit = async (e) => {
		e.preventDefault();
		if (!validateUser(user)) {
			toast.error('Please check your input.');
			return;
		}
		console.log(user);
		try {
			const response = await dispatch(login_action(user));
			if (response.success) {
				Cookies.set('userData', JSON.stringify(response.user));
				console.log(response);
				toast.success('login Successfully');
				navigate('/');
			} else {
				toast.error('Login failed Try again');
			}
			console.log(response);
		} catch (error) {
			console.error(error);
			toast.error('An error occurred while logging in.');
		}
	};

	function validateUser(user) {
		// Implement your validation logic here.
		// For example, check if required fields are filled, validate email format, etc.
		if (!user.email || !user.password) {
			return false;
		}
		// Additional validation rules...

		return true; // If all validations pass.
	}
	// navigate('/login');
	return (
		<div>
			<Navbar />

			<div className="centered-form">
				<div>
					{/* Other components */}
					<ToastContainer position="top-right" autoClose={3000} />
				</div>
				<form className="form_main" onSubmit={loginSubmit}>
					<p className="heading">Login</p>
					<div className="inputContainer">
						<AiOutlineMail className="inputIcon" />

						<input
							placeholder="Username"
							id="username"
							required
							className="inputField"
							type="Email"
							pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
							title="check your Email Id"
							value={user.email}
							onChange={(e) =>
								setuser({ ...user, email: e.target.value })
							}
						/>
					</div>
					<div className="inputContainer">
						<PiPasswordBold className="inputIcon" />

						<input
							placeholder="Password"
							required
							id="password"
							className="inputField"
							type="password"
							pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
							title="Password must contain at least 8 characters, including at least one letter, one number, and one special character (@$!%*#?&)"
							value={user.password}
							onChange={(e) =>
								setuser({ ...user, password: e.target.value })
							}
						/>
					</div>
					<input
						type="submit"
						value="Sign In"
						className="signUpBtn"
						id="button"
					/>
					<div className="signupContainer">
						<p>Don't have an account?</p>
						<a href="register">Sign up</a>
					</div>
				</form>
			</div>

			<Footer />
		</div>
	);
};

export default login;
