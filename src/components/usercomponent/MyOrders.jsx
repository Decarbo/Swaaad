import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Utensils, Clock, Calendar } from 'lucide-react';
import ShimmerGrid from '../shimer/ShimmerGrid';

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

	if (!user) return <p className="text-center mt-10 text-gray-300">Please login to view your orders.</p>;
	if (loading) return <ShimmerGrid count={3} />;
	if (!orders.length) return <p className="text-center mt-10 text-gray-400">You have no orders yet.</p>;

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
