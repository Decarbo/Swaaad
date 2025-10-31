import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
	},
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const existingItem = state.items.find((i) => i._id === item._id);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ ...item, quantity: 1 });
			}
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload;
			state.items = state.items.filter((i) => i._id !== itemId);
		},
		increaseQuantity: (state, action) => {
			const item = state.items.find((i) => i._id === action.payload);
			if (item) item.quantity += 1;
		},
		decreaseQuantity: (state, action) => {
			const item = state.items.find((i) => i._id === action.payload);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			} else {
				state.items = state.items.filter((i) => i._id !== action.payload);
			}
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
