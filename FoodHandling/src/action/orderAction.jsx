/** @format */

import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	CLEAR_ERRORS,
} from '../constants/orderConstants';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const order_action = (order) => async (dispatch) => {
	try {
		dispatch({ type: CREATE_ORDER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post('/api/v1/order/new', order, config);
		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
		message: 'Clear Errors',
	});
};
