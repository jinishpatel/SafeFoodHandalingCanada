/** @format */

import User from '../Model/userModel.js';
import crypto from 'crypto';

exports.registerUser = async (req, res, next) => {
	try {
		const { username, fistname, lastname, email, password } = req.body;
		const user = await User.create({
			username,
			fistname,
			lastname,
			email,
			password,
		});

		console.log('User: ', user);
	} catch (error) {
		console.log(error);
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Please provide Email and password' });
		}
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return res.status(401).json({ message: 'Invalid Email credentials' });
		}
		const ispasswordMatched = await user.comparePassword(password);
		if (!ispasswordMatched) {
			return res
				.status(401)
				.json({ message: 'Invalid Password credentials' });
		}
	} catch (error) {
		console.log(error);
	}
};

// exports.default = { registerUser, loginUser };
