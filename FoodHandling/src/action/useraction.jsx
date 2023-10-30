/** @format */

import {
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
} from '../constants/userConstants';
import { toast } from 'react-toastify';
import axios from 'axios';

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
		console.log(data);
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: data.user,
			message: data.message,
		});
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message,
		});
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
