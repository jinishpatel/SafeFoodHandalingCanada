/** @format */

import express from 'express';
import { paymentProcess } from '../Controller/paymentController.js';

import { isAuthenticatedUser } from '../middleware/isAuthenticated.js';
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, paymentProcess);

export default router;
