/** @format */

import React from 'react';
import Navbar from '../BaseWeb/navbar';
import Footer from '../BaseWeb/footer';
import './register.css';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { PiPasswordBold } from 'react-icons/pi';
import { HiAtSymbol } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { register_action } from '../../action/useraction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const register = () => {
	const dispatch = useDispatch();
	// const navigate = useNavigation();
	const [user, setuser] = useState({
		username: '',
		password: '',
		email: '',
		firstname: '',
		lastname: '',
	});
	function validateUser(user) {
		// Implement your validation logic here.
		// For example, check if required fields are filled, validate email format, etc.
		if (!user.username || !user.email || !user.password) {
			return false;
		}
		// Additional validation rules...

		return true; // If all validations pass.
	}
	const registerSubmit = (e) => {
		e.preventDefault();
		const myform = new FormData();
		myform.set('username', user.username);
		myform.set('password', user.password);
		myform.set('firstname', user.firstname);
		myform.set('lastname', user.lastname);
		myform.set('email', user.email);
		if (!validateUser(user)) {
			toast.error('Validation failed. Please check your input.');
			return;
		}

		dispatch(register_action(myform));
		toast.success('Registration successful. Please login.');
		// navigate('/login');
	};

	return (
		<div>
			<Navbar />

			<div className="centered-form-register">
				<div>
					{/* Other components */}
					<ToastContainer position="top-right" autoClose={3000} />
				</div>
				<form className="form_main-register" onSubmit={registerSubmit}>
					<p className="heading">Register</p>
					<div className="inputContainer">
						<AiOutlineUser className="inputIcon" />
						<input
							placeholder="Username"
							id="username"
							className="inputField"
							type="text"
							value={user.username}
							onChange={(e) =>
								setuser({ ...user, username: e.target.value })
							}
						/>
					</div>
					<div className="firstlastname-container">
						<div className="inputContainer1">
							<HiAtSymbol className="inputIcon" />
							<input
								placeholder="First Name"
								id="firstname"
								className="inputField"
								type="text"
								value={user.firstname}
								onChange={(e) =>
									setuser({ ...user, firstname: e.target.value })
								}
							/>
						</div>
						<div className="inputContainer2">
							<input
								placeholder="Last Name"
								id="lastname"
								className="inputField"
								type="text"
								value={user.lastname}
								onChange={(e) =>
									setuser({ ...user, lastname: e.target.value })
								}
							/>
						</div>
					</div>
					<div className="inputContainer">
						<AiOutlineMail className="inputIcon" />

						<input
							placeholder="Email"
							id="email"
							className="inputField"
							type="text"
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
							id="password"
							className="inputField"
							type="password"
							value={user.password}
							onChange={(e) =>
								setuser({ ...user, password: e.target.value })
							}
						/>
					</div>

					<input
						type="submit"
						value="Register"
						className="signUpBtn"
						id="button"
					/>
					<div className="signupContainer">
						<p> have an account with us?</p>
						<a href="login">Sign In</a>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default register;
