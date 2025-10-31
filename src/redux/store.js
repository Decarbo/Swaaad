// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ── Slices ─────────────────────────────────────────────────────
import cartReducer from './slice/cartSlice';
import userReducer from './slice/userSlice';
import adminReducer from './slice/adminSlice';
import filterReducer from './slice/filterSlice';

// ── Combine reducers ───────────────────────────────────────────
const rootReducer = combineReducers({
	cart: cartReducer,
	user: userReducer,
	admin: adminReducer,
	filter: filterReducer,
});

// ── Persist config ─────────────────────────────────────────────
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'cart', 'admin', 'filter'], // everything you want to survive refresh
};

// ── Persisted reducer ──────────────────────────────────────────
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ── Store (with serializableCheck turned off for redux‑persist) ─
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// redux‑persist actions contain functions → ignore them
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
export default store;

