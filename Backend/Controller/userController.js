/** @format */

import User from '../Model/userModel.js';
import crypto from 'crypto';
import catchAsyncError from '../middleware/catchAsyncError.js';
import sendToken from '../utils/jwtToken.js';

export const registerUser = catchAsyncError(async (req, res, next) => {
	try {
		const { username, firstname, lastname, email, password } = req.body;
		const user = await User.create({
			username,
			firstname,
			lastname,
			email,
			password,
		});

		console.log('User: ', user);
		res.status(201).json({ message: 'User created successfully' });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'User not created ' });
	}
});

export const loginUser = catchAsyncError(async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Please provide Email and password',
			});
		}
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid Email or Password' });
		}
		const ispasswordMatched = await user.comparePassword(password);
		if (!ispasswordMatched) {
			res.status(401).json({
				success: false,
				message: 'Invalid Email or Password',
			});
		}
		console.log(user.email + '  login successfully');
		sendToken(user, 200, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
});
