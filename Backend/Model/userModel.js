/** @format */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { userInfo } from 'os';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your name'],
		maxLength: [30, 'Your name cannot exceed 30 characters'],
	},
	firstname: {
		type: String,
		required: [true, 'Please enter your firstname'],
		maxLength: [30, 'Your firstname cannot exceed 30 characters'],
	},
	lastname: {
		type: String,
		required: [true, 'Please enter your lastname'],
		maxLength: [30, 'Your lastname cannot exceed 30 characters'],
	},
	phone: {
		type: String,
		required: [true, 'Please enter your phone number'],
		maxLength: [10, 'Your phone number cannot exceed 10 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email'],
		unique: true,
		validate: [validator.isEmail, 'Please enter a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password'],
		minlength: [6, 'Your password must be longer than 6 characters'],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: false,
		},
		url: {
			type: String,
			required: false,
		},
	},
	role: {
		type: String,
		default: 'user',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.pre('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
		try {
			this.password = await bcrypt.hash(this.password, 10);
		} catch (error) {
			return next(error);
		}
	} else {
		next();
	}
});

const User = mongoose.model('User', UserSchema);

export default User;
