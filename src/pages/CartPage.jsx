import React, { useState, useMemo, Suspense, lazy, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../redux/slice/cartSlice';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingModal = lazy(() => import('../components/BookingModal'));

// Memoized Cart Item
const CartItem = memo(({ item, onIncrease, onDecrease, onRemove }) => (
	<motion.div
		className="flex flex-col sm:flex-row items-center justify-between bg-gray-800/60 border border-gray-700 rounded-3xl p-5 shadow-xl backdrop-blur-md"
		initial={{ y: 30, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		whileHover={{ scale: 1.02 }}>
		<div className="flex items-center gap-5 w-full sm:w-auto">
			<motion.img
				src={item.imageUrl}
				alt={item.name}
				className="w-24 h-24 rounded-2xl object-cover border border-gray-700"
				whileHover={{ scale: 1.1 }}
			/>
			<div>
				<h2 className="text-xl font-semibold">{item.name}</h2>
				<p className="text-gray-400 text-sm">
					₹{item.price} each • {item.category}
				</p>
			</div>
		</div>

		<div className="flex items-center gap-3 mt-4 sm:mt-0">
			<motion.button
				whileTap={{ scale: 0.9 }}
				onClick={onDecrease}
				className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-lg font-bold">
				–
			</motion.button>
			<motion.span
				className="font-semibold text-lg px-3"
				animate={{ scale: [1, 1.2, 1] }}
				transition={{ duration: 0.3 }}>
				{item.quantity}
			</motion.span>
			<motion.button
				whileTap={{ scale: 0.9 }}
				onClick={onIncrease}
				className="px-3 py-1.5 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 font-bold">
				+
			</motion.button>
			<motion.button
				whileTap={{ rotate: 20, scale: 0.9 }}
				onClick={onRemove}
				className="ml-3 text-red-400 hover:text-red-600 transition">
				<Trash2 size={20} />
			</motion.button>
		</div>
	</motion.div>
));

export default function CartPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const items = useSelector((state) => state.cart.items);
	const user = useSelector((state) => state.user.user);

	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const BASE_URL = 'https://swaaad-backend.onrender.com/api';

	const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

	const handleBooking = async (form) => {
		if (!user?.token) return alert('Please login first');

		try {
			setLoading(true);
			const payload = {
				items: items.map((i) => ({ foodId: i._id, quantity: i.quantity })),
				restaurantId: items[0]?.shopkeeper?._id,
				deliveryAddress: 'College Canteen',
				phone: form.phone,
				specialInstructions: form.specialInstructions,
				paymentMethod: 'Cash',
				reservationType: 'Dine-In',
			};
			const res = await axios.post(`${BASE_URL}/user/orders`, payload, { headers: { Authorization: `Bearer ${user.token}` } });
			alert(res.data.message || 'Booking successful!');
			dispatch(clearCart());
			setShowModal(false);
		} catch (err) {
			if (err.response?.status === 401) {
				alert('Session expired, please login again');
				navigate('/login');
			} else {
				alert(err.response?.data?.error || 'Something went wrong');
			}
		} finally {
			setLoading(false);
		}
	};

	if (items.length === 0)
		return (
			<motion.div
				className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white text-center p-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}>
				<motion.div
					className="flex flex-col items-center"
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', stiffness: 100 }}>
					<ShoppingBag className="w-20 h-20 text-yellow-400 mb-4" />
					<h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
					<p className="text-gray-400 mb-6">Looks like you haven’t added any delicious food yet.</p>
					<Link
						to="/menu"
						className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-lg">
						Explore Menu
					</Link>
				</motion.div>
			</motion.div>
		);

	return (
		<motion.div
			className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}>
			<h1 className="text-4xl font-extrabold m-14 text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">Your Cart</h1>

			<div className="max-w-5xl mx-auto space-y-6">
				{items.map((item) => (
					<CartItem
						key={item._id}
						item={item}
						onIncrease={() => dispatch(increaseQuantity(item._id))}
						onDecrease={() => dispatch(decreaseQuantity(item._id))}
						onRemove={() => dispatch(removeFromCart(item._id))}
					/>
				))}

				<motion.div
					className="flex flex-col sm:flex-row justify-between items-center mt-12 border-t border-gray-700 pt-6"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3 }}>
					<h2 className="text-2xl font-bold text-yellow-400">Total: ₹{totalPrice}</h2>
					<motion.button
						onClick={() => setShowModal(true)}
						disabled={loading}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="mt-4 sm:mt-0 bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-2xl shadow-lg hover:bg-yellow-500 disabled:opacity-60">
						{loading ? 'Booking...' : 'Book A Table'}
					</motion.button>
				</motion.div>
			</div>

			{showModal && (
				<Suspense fallback={<div>Loading modal...</div>}>
					<BookingModal
						onClose={() => setShowModal(false)}
						onConfirm={handleBooking}
					/>
				</Suspense>
			)}
		</motion.div>
	);
}
