import catchAsyncError from '../middleware/catchAsyncError.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import StripeOrder from '../Model/stripeOrderModel.js';
import Certificate from '../Model/certificateModel.js';
dotenv.config({ path: './config/.env' });

//Stripe Payment Integration
const stripe = Stripe(process.env.STRIPE_API_KEY);
export const IntegratePayment = catchAsyncError(async (req, res, next) => {
    console.log(req.body);
    if (!(typeof req.body.userID === 'string' && /^[0-9a-fA-F]{24}$/.test(req.body.userID))) {
        return res.status(404).send("Invalid User ID!");
    }
    try {
        const PlaceholderOrder = new StripeOrder({
            user: req.body.userID,
            orderItems: [
                {
                    name: req.body.item,
                    price: Number(req.body.unit_price),
                    // image: 'imageURL'
                },
            ],
        });
        const savedPlaceholderOrder = await PlaceholderOrder.save();
        if (savedPlaceholderOrder) {
            console.log('Saved Placeholder Order.');
        }
        else {
            console.log('Unable to save placeholder order.');
            return res.status(500).send('Internal Server Error!');
        }
        const sessionExpirationSeconds = 60 * 30; // 30 minutes minimum
        const expirationTime = Math.floor(Date.now() / 1000) + sessionExpirationSeconds;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: req.body.item,
                            // images: [image],

                        },
                        unit_amount: Number(req.body.unit_price),
                        // tax_rates: [StripeTaxRateID],
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/course`,
            client_reference_id: savedPlaceholderOrder._id.toString(),
            expires_at: expirationTime,
        });
        const completeOrderDetails = {
            paymentInfo: {
                status: session.payment_status,
                itemsPrice: session.amount_total,
                taxPrice: session.total_details.amount_tax,
                totalPrice: session.amount_subtotal,
                createdAt: Date.now(),
                paidAt: null,
            },
        };
        const savedOrder = await StripeOrder.updateOne({ _id: savedPlaceholderOrder._id }, completeOrderDetails);
        if (savedOrder) {
            console.log('Order updated with complete information.');
            res.status(200).send({ url: session.url });
        }
        else {
            return res.status(500).send('Internal Server Error!');
        }
    } catch (error) {
        console.log('Error in Stripe: ', error);
        res.status(500).send('Internal Server Error!')
    }
});

export const StripeHooks = catchAsyncError(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOKS_KEY);
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const clientReferenceId = session.client_reference_id;
        const updatedOrder = await StripeOrder.findOneAndUpdate(
            { _id: clientReferenceId },
            {
                $set: {
                    'paymentInfo.status': 'paid',
                    'paymentInfo.paidAt': Date.now(),
                },
            },
            { new: true }
        );

        if (updatedOrder) {
            console.log('Order updated:', updatedOrder);
            res.status(200).send('Order status updated!');
        }
        else {
            res.status(500).send('Unable to update order status.');
        }
    }
    else if (event.type === 'checkout.session.expired') {
        // Handle payment failure or cancellation
        const session = event.data.object;
        const clientReferenceId = session.client_reference_id;
        const updatedOrder = await StripeOrder.findOneAndUpdate(
            { _id: clientReferenceId },
            {
                $set: {
                    'paymentInfo.status': 'failed',
                },
            },
            { new: true }
        );

        if (updatedOrder) {
            console.log('Order updated:', updatedOrder);
            res.status(200).send('Order status updated!');
        }
        else {
            res.status(500).send('Unable to update order status.');
        }
    }
    else {
        res.status(200).send('Unhandled webhooks event.');
    }
});

export const StripeOrderStatus = catchAsyncError(async (req, res, next) => {
    if (!(typeof req.params.userID === 'string' && /^[0-9a-fA-F]{24}$/.test(req.params.userID))) {
        return res.status(404).send("Invalid User ID!");
    }
    try {
        const order = await StripeOrder.findOne({ user: req.params.userID, 'paymentInfo.status': 'paid' });
        if (order) {
            res.status(200).json(order);
        }
        else {
            res.status(404).send('User Order Not Found!');
        }
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Internal Server Error!');
    }
});

export const CreateCertificate = catchAsyncError(async (req, res, next) => {
    const { id, score, totalScore, percentage } = req.body;
    try {
        const certificateData = await new Certificate({
            user: id,
            score,
            totalScore,
            percentage,
        });
        const certificate = await certificateData.save();
        if (certificate) {
            res.status(200).send('Certificate Saved!');
        }
    } catch (error) {
        console.log('Unable to save certificate: ', error);
        res.status(500).send('Unable to save Certificate!');
    }
});

export const GetCertificate = catchAsyncError(async (req, res, next) => {
    const id = req.params.userID;
    try {
        const certificate = await Certificate.findOne({ user: id }).populate('user');
        if (certificate) {
            res.status(200).json(certificate);
        }
        else {
            res.status(404).send('Certificate not found!');
        }
    } catch (error) {
        console.log('Error while fetching certificate: ', error);
        res.status(500).send('Internal Server Error!');
    }
});
