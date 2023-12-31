import React, { useState, useEffect } from "react";
import { SiMediamarkt } from "react-icons/si";
import Savings from "../products/Savings";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { StoreProduct } from "../../../type";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
	const { products, user } = useSelector((state: RootState) => state.next);
	const [totalAmount, setTotalAmount] = useState(0);
	useEffect(() => {
		let amount = 0;
		products.forEach((product: StoreProduct) => {
			amount += product.quantity * product.price;
		});
		setTotalAmount(amount);
	}, [products]);

	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
	);
	const handleCheckout = async () => {
		const stripe = await stripePromise;
		const response = await fetch("/api/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ products, email: user?.email }),
		});
		const checkoutSession = await response.json();
		const result: any = await stripe?.redirectToCheckout({
			sessionId: checkoutSession.id,
		});
		if (result.error) {
			alert(result?.error.message);
		}
	};
	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1">
					<SiMediamarkt />
				</span>
				<p className="text-sm">
					Your order qualifies for FREE Shipping by choosing this
					option at checkout. See details...
				</p>
			</div>
			<p className="flex items-center justify-between px-2 font-semibold">
				Total:{" "}
				<span className="font-bold text-xl">
					<Savings amount={totalAmount} />
				</span>
			</p>
			{user ? (
				<div>
					<button
						onClick={() => handleCheckout()}
						className="w-full h-10 text-sm font-semibold bg-amazon_blue text-white rounded-lg hover:bg-amazon_yellow hover:text-black"
					>
						Proceed to Buy
					</button>
				</div>
			) : (
				<div>
					<button className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
						Proceed to Buy
					</button>
					<p className="text-xs mt-1 text-red-500 font-semibold animate-bounce duration-700">
						Please login to continue
					</p>
				</div>
			)}
		</div>
	);
};

export default Payment;
