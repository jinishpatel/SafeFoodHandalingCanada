import express from 'express';
import { IntegratePayment, StripeOrderStatus, StripeHooks, CreateCertificate, GetCertificate } from '../Controller/StripeIntegration.js';
const router = express.Router();
router.route('/create-checkout-session').post(express.json(), IntegratePayment);
router.route('/webhooks').post(express.raw({ type: 'application/json' }), StripeHooks);
router.route('/status/:userID').get(StripeOrderStatus);
router.route('/create-certificate').post(express.json(), CreateCertificate);
router.route('/get-certificate/:userID').get(GetCertificate);
export default router;
