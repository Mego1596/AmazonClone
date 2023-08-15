import React from "react";
import { StoreProduct } from "../../../type";
import Image from "next/image";
import Savings from "../products/Savings";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
	decreaseQuantity,
	increaseQuantity,
	deleteProduct,
} from "@/store/nextSlice";

interface Props {
	product: StoreProduct;
}
const CartProduct = ({ product }: Props) => {
	const dispatch = useDispatch();
	return (
		<div className="bg-gray-100 rounded-lg flex items-center gap-4">
			<Image
				className="w-auto h-auto object-cover"
				width={150}
				height={150}
				priority
				src={product.image}
				alt={product.title}
			/>
			<div className="flex items-center px-2 gap-4">
				<div className="flex flex-col gap-1">
					<p className="text-lg font-semibold text-amazon_blue">
						{product.title}
					</p>
					<p className="text-sm text-gray-600">
						{product.description}
					</p>
					<p className="text-sm text-gray-600">
						Unit Price:
						<span className="font-semibold text-amazon_blue">
							<Savings amount={product.price} />
						</span>
					</p>
					<div className="flex items-center gap-6">
						<div className="flex items-center justify-between mt-1 border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
							<span
								onClick={() =>
									dispatch(
										increaseQuantity({
											_id: product._id,
											brand: product.brand,
											category: product.category,
											image: product.image,
											description: product.description,
											isNew: product.isNew,
											oldPrice: product.oldPrice,
											price: product.price,
											title: product.title,
											quantity: 1,
										})
									)
								}
								className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
							>
								<LuPlus />
							</span>
							<span>{product.quantity}</span>
							<span
								onClick={() =>
									dispatch(
										decreaseQuantity({
											_id: product._id,
											brand: product.brand,
											category: product.category,
											image: product.image,
											description: product.description,
											isNew: product.isNew,
											oldPrice: product.oldPrice,
											price: product.price,
											title: product.title,
											quantity: 1,
										})
									)
								}
								className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
							>
								<LuMinus />
							</span>
						</div>
						<div
							onClick={() =>
								dispatch(
									deleteProduct({
										_id: product._id,
									})
								)
							}
							className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
						>
							<IoMdClose className="mt-[2px]" />
							<p>remove</p>
						</div>
					</div>
				</div>
				<div className="text-lg font-semibold text-amazon_blue">
					<Savings amount={product.price * product.quantity} />
				</div>
			</div>
		</div>
	);
};

export default CartProduct;
