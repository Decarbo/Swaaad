import React, { useState, useMemo, Suspense, lazy, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../redux/slice/cartSlice';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

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
			<LazyMotion features={domAnimation}>
				<motion.div
					className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6 overflow-hidden relative"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}>
					{/* Animated Background Orbs */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<motion.div
							animate={{
								x: [0, 100, 0],
								y: [0, -100, 0],
							}}
							transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
							className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
						/>
						<motion.div
							animate={{
								x: [0, -80, 0],
								y: [0, 80, 0],
							}}
							transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
							className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
						/>
					</div>

					<motion.div
						className="relative z-10 max-w-md w-full"
						initial={{ scale: 0.9, y: 20 }}
						animate={{ scale: 1, y: 0 }}
						transition={{ type: 'spring', stiffness: 120, damping: 20 }}>
						{/* Floating 3D Shopping Bag */}
						<motion.div
							className="relative mb-8"
							animate={{
								y: [0, -20, 0],
								rotate: [0, 5, -5, 0],
							}}
							transition={{
								y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
								rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
							}}>
							<div className="relative inline-block">
								{/* Bag Shadow */}
								<motion.div
									animate={{ scale: [1, 1.1, 1] }}
									transition={{ duration: 4, repeat: Infinity }}
									className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl -z-10"
								/>

								{/* Bag Container */}
								<div className="relative p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl transform-gpu">
									<ShoppingBag className="w-24 h-24 text-gray-900" />

									{/* Floating Sparkles */}
									<motion.div
										animate={{ rotate: 360 }}
										transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
										className="absolute -top-2 -right-2">
										<Sparkles className="w-6 h-6 text-yellow-300" />
									</motion.div>
									<motion.div
										animate={{ rotate: -360 }}
										transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
										className="absolute -bottom-2 -left-2">
										<Sparkles className="w-5 h-5 text-orange-300" />
									</motion.div>
								</div>
							</div>
						</motion.div>

						{/* Text Content */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="text-center space-y-4">
							<h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 ">Your Cart is Empty</h2>
							<p className="text-gray-300 text-base leading-relaxed max-w-xs mx-auto">Looks like you haven’t added any delicious food yet. Let’s fill it with flavor!</p>
						</motion.div>

						{/* CTA Button */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="mt-10 flex justify-center">
							<Link
								to="/menu"
								className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
								{/* Ripple Effect */}
								<span className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-150 transition-transform duration-500 rounded-full" />

								<span className="relative z-10 flex items-center gap-3">
									Explore Menu
									<motion.span
										animate={{ x: [0, 4, 0] }}
										transition={{ duration: 1.5, repeat: Infinity }}
										className="inline-block">
										<ArrowRight className="w-5 h-5" />
									</motion.span>
								</span>
							</Link>
						</motion.div>


					</motion.div>
				</motion.div>
			</LazyMotion>
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
