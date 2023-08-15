import { NextApiRequest, NextApiResponse } from "next";
import { StoreProduct } from "../../../type";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const { products, email } = request.body;
	const modifiedProducts = products.map((product: StoreProduct) => {
		return {
			quantity: product.quantity,
			price_data: {
				currency: "usd",
				unit_amount: product.price * 100,
				product_data: {
					name: product.title,
					description: product.description,
					images: [product.image],
				},
			},
		};
	});
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_address_collection: {
			allowed_countries: ["BD", "US", "OM", "CA", "GB"],
		},
		line_items: modifiedProducts,
		mode: "payment",
		success_url: `${process.env.NEXTAUTH_URL}/success`,
		cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
		metadata: {
			email,
			images: JSON.stringify(
				products.map((product: StoreProduct) => product.image)
			),
		},
	});
	response.status(200).json({
		id: session.id,
	});
}
