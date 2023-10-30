/** @format */

import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_FAIL,
	REGISTER_USER_SUCCESS,
	CLEAR_ERRORS,
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {
				loading: true,
				isauthenticated: true,
			};
		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				isauthenticated: true,
				user: action.payload,
			};
		case REGISTER_USER_FAIL:
			return {
				...state,
				loading: false,
				isauthenticated: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
