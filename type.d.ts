export interface Product {
	brand: string;
	category: string;
	description: string;
	image: string;
	isNew: boolean;
	oldPrice: number;
	price: number;
	title: string;
	_id: number;
}

export interface StoreProduct extends Product {
	quantity: number;
}

export type User = {
	name: string;
	email: string;
	image: string;
};
