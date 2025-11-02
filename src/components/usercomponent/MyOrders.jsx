import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Utensils, Clock, Calendar, LogIn, Lock } from 'lucide-react';
import ShimmerGrid from '../shimer/ShimmerGrid';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://swaaad-backend.onrender.com/api';

// Memoized OrderCard
const OrderCard = memo(({ order }) => {
	const formatDate = (dateStr) =>
		new Intl.DateTimeFormat('en-IN', {
			dateStyle: 'medium',
			timeStyle: 'short',
		}).format(new Date(dateStr));
	const { user } = useSelector((state) => state.user);

	const handleCancel = async () => {
		if (!window.confirm('Are you sure you want to cancel this order?')) return;
		try {
			await axios.put(
				`${BASE_URL}/user/orders/${order._id}/cancel`,
				{},
				{
					headers: { Authorization: `Bearer ${user.token}` },
				}
			);
			alert('Order cancelled successfully!');
			window.location.reload(); // refresh order list
		} catch (err) {
			alert(err.response?.data?.error || 'Failed to cancel order');
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 hover:shadow-yellow-500/10 transition-shadow">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-xl font-semibold">{order.restaurant?.restaurantName || 'Restaurant'}</h2>
				<span className={`px-3 py-1 rounded-full font-semibold text-sm ${order.status === 'Pending' ? 'bg-yellow-400 text-gray-900' : order.status === 'Table Assigned' ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>{order.status}</span>
			</div>

			{order.tableNumber && (
				<div className="flex items-center gap-3 mb-3 bg-green-600/20 p-3 rounded-lg border border-green-500/30">
					<Utensils
						className="text-green-400"
						size={20}
					/>
					<div>
						<p className="font-semibold text-green-400">Table No: {order.tableNumber}</p>
						{order.tableAssignedAt && (
							<p className="text-sm text-gray-400 flex items-center gap-1">
								<Clock size={14} />
								Assigned at {formatDate(order.tableAssignedAt)}
							</p>
						)}
					</div>
				</div>
			)}

			<div className="space-y-2">
				{order.items?.map((item) => (
					<div
						key={item.food?._id}
						className="flex justify-between items-center border-b border-gray-700 pb-2">
						<div className="flex items-center gap-3">
							<img
								src={item.food?.imageUrl || '/placeholder-food.jpg'}
								alt={item.food?.name || 'Food'}
								className="w-16 h-16 object-cover rounded-lg"
							/>
							<div>
								<p className="font-semibold">{item.food?.name || 'Food'}</p>
								<p className="text-gray-400 text-sm">{item.food?.category}</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-semibold">Qty: {item.quantity}</p>
							<p className="font-semibold text-yellow-400">₹{(item.food?.price || 0) * item.quantity}</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-3 border-t border-gray-700 pt-3 flex justify-between items-center">
				<p className="font-bold text-lg text-yellow-400">Total: ₹{order.totalPrice}</p>
				<p className="text-gray-400 text-sm flex items-center gap-1">
					<Calendar size={14} />
					{formatDate(order.createdAt)}
				</p>
			</div>
			{['Pending', 'Table Requested'].includes(order.status) && (
				<button
					onClick={handleCancel}
					className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
					Cancel
				</button>
			)}
		</motion.div>
	);
});

export default function MyOrders() {
	const { user } = useSelector((state) => state.user);
	const [orders, setOrders] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		if (!user?.token) return;

		const fetchOrders = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/user/my-orders`, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				setOrders(res.data);
			} catch (err) {
				console.error(err);
				alert(err.response?.data?.error || 'Failed to fetch orders');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [user]);

	if (!user)
		return (
			<LazyMotion features={domAnimation}>
				<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
						className="max-w-md w-full">
						<div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl text-center overflow-hidden">
							{/* Animated Background Orbs */}
							<div className="absolute -top-12 -left-12 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
							<div className="absolute -bottom-12 -right-12 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

							{/* Lock Icon with Pulse */}
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
								className="relative inline-block mb-6">
								<div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-1">
									<div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
										<Lock className="w-12 h-12 text-yellow-400" />
									</div>
								</div>
								<motion.div
									animate={{ scale: [1, 1.2, 1] }}
									transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
									className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-400/40"
								/>
							</motion.div>

							{/* Message */}
							<motion.h2
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.3 }}
								className="text-2xl sm:text-3xl font-bold text-white mb-3">
								Login Required
							</motion.h2>

							<motion.p
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.4 }}
								className="text-gray-300 text-base mb-8 leading-relaxed">
								Sign in to view your orders, track deliveries, and explore your dining history.
							</motion.p>

							{/* CTA Button */}
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.5 }}>
								<Link
									to="/user/login"
									className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
									<LogIn className="w-5 h-5" />
									<span>Login Now</span>
								</Link>
							</motion.div>

							{/* Subtle Hint */}
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.7 }}
								className="text-xs text-gray-500 mt-6">
								New here? <Link to="/user/register" className="text-yellow-400 font-medium hover:underline"> Create an account</Link>
							</motion.p>
						</div>
					</motion.div>
				</div>
			</LazyMotion>
		);

	if (loading) return <ShimmerGrid count={8} />;
	if (!orders.length) {
		return (
			<LazyMotion features={domAnimation}>
				<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex items-center justify-center p-6">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
						className="max-w-md w-full">
						<div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl text-center overflow-hidden">
							{/* Decorative Gradient Orbs */}
							<div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
							<div className="absolute -bottom-10 -right-10 w-56 h-56 bg-orange-500/20 rounded-full blur-3xl"></div>

							{/* Main Illustration */}
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.2 }}
								className="mb-8">
								<div className="relative inline-block">
									<div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-1">
										<div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
											<Utensils className="w-16 h-16 text-yellow-400" />
										</div>
									</div>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
										className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-400/30"
									/>
								</div>
							</motion.div>

							{/* Text Content */}
							<motion.h2
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.3 }}
								className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 mb-3">
								Your Plate is Empty
							</motion.h2>

							<motion.p
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.4 }}
								className="text-gray-300 text-base mb-8 leading-relaxed">
								Time to explore delicious meals crafted by top chefs. Your next favorite dish is just a tap away!
							</motion.p>

							{/* CTA Button */}
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.5 }}>
								<Link
									to="/menu"
									className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
									<span>Browse Menu</span>
									<motion.span
										animate={{ x: [0, 4, 0] }}
										transition={{ duration: 1.5, repeat: Infinity }}>
										→
									</motion.span>
								</Link>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</LazyMotion>
		);
	}

	return (
		<LazyMotion features={domAnimation}>
			<div className="min-h-screen bg-gray-900 text-white p-8">
				<h1 className="text-4xl font-bold pt-14 text-yellow-400 text-center mb-8">My Orders</h1>
				<div className="max-w-5xl mx-auto space-y-6">
					{orders.map((order) => (
						<OrderCard
							key={order._id}
							order={order}
						/>
					))}
				</div>
			</div>
		</LazyMotion>
	);
}
