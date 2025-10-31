// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import userReducer from './slice/userSlice';
import adminReducer from './slice/adminSlice';
import filterReducer from './slice/filterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	cart: cartReducer,
	user: userReducer,
	admin: adminReducer,
	filter: filterReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'cart', 'admin', 'filter'], // bas user data persist karna hai (cart optional)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
