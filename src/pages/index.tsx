import React from "react";
import Banner from "@/components/banner/Banner";
import Products from "@/components/products/Products";
import { Product } from "../../type";

interface Props {
	products: Product[];
}

export default function Home({ products }: Props) {
	return (
		<main>
			<div className="max-w-screen-2xl mx-auto">
				<Banner />
				<div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
					<Products products={products} />
				</div>
			</div>
		</main>
	);
}

export const getServerSideProps = async () => {
	const response = await fetch("https://fakestoreapiserver.reactbd.com/tech");
	const products = await response.json();
	return { props: { products } };
};
