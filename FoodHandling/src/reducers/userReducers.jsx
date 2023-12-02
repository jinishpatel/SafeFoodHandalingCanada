/** @format */

import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_FAIL,
	REGISTER_USER_SUCCESS,
	CLEAR_ERRORS,
	LOGIN_USER_FAIL,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOAD_USER_STATE,
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
		case LOGIN_USER_REQUEST:
			return {
				loading: true,
				isauthenticated: false,
			};
		case REGISTER_USER_SUCCESS:
		case LOGIN_USER_SUCCESS:
			return {
				loading: false,
				isauthenticated: true,
				user: action.payload,
			};
		case LOAD_USER_STATE:
			return {
				loading: false,
				isauthenticated: true,
				user: action.payload,
			};
		case REGISTER_USER_FAIL:
		case LOGIN_USER_FAIL:
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
