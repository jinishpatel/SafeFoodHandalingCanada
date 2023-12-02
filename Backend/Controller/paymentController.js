/** @format */

export const paymentProcess = async (req, res, next) => {
	const { totalPrice } = req.body;

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			totalPrice,
		});

		res.status(200).send({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: 'Payment failed' });
	}
};
