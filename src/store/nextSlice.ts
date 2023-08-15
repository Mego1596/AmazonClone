import { createSlice } from "@reduxjs/toolkit";
import { StoreProduct, User } from "../../type";

interface NextState {
	products: StoreProduct[];
	favoriteProducts: StoreProduct[];
	allProducts: StoreProduct[];
	user: null | User;
}

const initialState: NextState = {
	products: [],
	favoriteProducts: [],
	allProducts: [],
	user: null,
};

export const nextSlice = createSlice({
	name: "next",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const existingProduct = state.products.find(
				(product: StoreProduct) => product._id == action.payload._id
			);
			if (existingProduct) {
				existingProduct.quantity += action.payload.quantity;
			} else {
				state.products.push(action.payload);
			}
		},
		addToFavorite: (state, action) => {
			const existingProduct = state.favoriteProducts.find(
				(product: StoreProduct) => product._id == action.payload._id
			);
			if (!existingProduct) {
				state.favoriteProducts.push(action.payload);
			}
		},
		increaseQuantity: (state, action) => {
			const existingProduct = state.products.find(
				(product: StoreProduct) => product._id == action.payload._id
			);
			existingProduct && existingProduct.quantity++;
		},
		decreaseQuantity: (state, action) => {
			const existingProduct = state.products.find(
				(product: StoreProduct) => product._id == action.payload._id
			);
			if (existingProduct?.quantity === 1) {
				existingProduct.quantity = 1;
			} else {
				existingProduct!.quantity--;
			}
		},
		deleteProduct: (state, action) => {
			state.products = state.products.filter(
				(product: StoreProduct) => product._id !== action.payload._id
			);
		},
		resetCart: (state) => {
			state.products = [];
		},
		addUser: (state, action) => {
			state.user = action.payload;
		},
		removeUser: (state) => {
			state.user = null;
		},
		setAllProducts: (state, action) => {
			state.allProducts = action.payload;
		},
	},
});

export const {
	addToCart,
	addToFavorite,
	increaseQuantity,
	decreaseQuantity,
	deleteProduct,
	resetCart,
	addUser,
	removeUser,
	setAllProducts,
} = nextSlice.actions;
export default nextSlice.reducer;
