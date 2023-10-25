/** @format */

import express from 'express';
import { registerUser } from '../Controller/userController.js';
const router = express.Router();

router.route('/register').post(registerUser);
// router.route('/login').post(loginUser);
// router.route('/logout').get(logoutUser);

module.exports = router;
