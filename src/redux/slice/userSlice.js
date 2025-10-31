// src/redux/slice/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from './cartSlice';

const initialState = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		logoutUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, logoutUser } = userSlice.actions;

// 🧠 This function ensures that old user's cart is cleared when a new user logs in
export const handleLogin = (newUser) => (dispatch, getState) => {
	const prevUser = getState().user.user;
	if (prevUser && prevUser._id !== newUser._id) {
		dispatch(clearCart());
	}
	dispatch(setUser(newUser));
};

// 🧠 Logout and clear cart both
export const handleLogout = () => (dispatch) => {
	dispatch(logoutUser());
	dispatch(clearCart());
};

export default userSlice.reducer;
