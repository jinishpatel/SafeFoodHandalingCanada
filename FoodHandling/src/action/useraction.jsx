/** @format */

import {
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOAD_USER_STATE,
} from '../constants/userConstants';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const loadUserState = () => (dispatch) => {
	// Load user state from cookies or local storage
	const userState = Cookies.get('userData');

	if (userState) {
		dispatch({
			type: LOAD_USER_STATE,
			payload: userState,
		});
	}
};
export const register_action = (formData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		console.log(formData);

		const { data } = await axios.post(
			'http://localhost:4000/api/v1/register',
			formData,
			config,
		);
		console.log(data.success);
		if (data.success) {
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: data.user, // Ensure user data is in data.user
				message: data.message,
			});
			console.log(data.user);
			toast.success('Registered Successfully from useraction');
			return data;
		}
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message,
		});
		toast.error('Validations failed check your input');
	}
};

export const login_action = (user) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_USER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		console.log(user);
		const { data } = await axios.post(
			'http://localhost:4000/api/v1/login',
			user,
			config,
		);
		console.log(data.success);
		if (data.success) {
			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: data.user,
				message: data.message,
			});

			toast.success('Login Successful');
			return data;
		} else {
			// Display a toast error for incorrect credentials
			toast.error('Invalid Email or Password');
		}
	} catch (error) {
		dispatch({
			type: LOGIN_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};
