import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function RestaurantOrders() {
	const { admin, token } = useSelector((state) => state.admin);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [assigningOrder, setAssigningOrder] = useState(null);
	const [tableNumber, setTableNumber] = useState('');

	const BASE_URL = 'https://swaaad-backend.onrender.com/api/user/restaurant/orders';

	useEffect(() => {
		if (!token) return;

		const fetchOrders = async () => {
			try {
				const { data } = await axios.get(BASE_URL, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setOrders(data);
			} catch (err) {
				console.error(err);
				alert(err.response?.data?.error || 'Failed to fetch orders');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [token]);

	const handleMarkAsDone = async (orderId) => {
		if (!window.confirm('Mark order as done? Table will be freed.')) return;
		try {
			const { data } = await axios.put(`${BASE_URL}/${orderId}/done`, {}, { headers: { Authorization: `Bearer ${token}` } });
			setOrders((prev) => prev.map((o) => (o._id === orderId ? data.order : o)));
			alert('Order marked as done! Table is now free.');
		} catch (err) {
			alert(err.response?.data?.error || 'Failed to mark as done');
		}
	};

	const handleAssignTable = async () => {
		if (!tableNumber.trim()) return alert('Enter table number');
		try {
			const { data } = await axios.put(`${BASE_URL}/${assigningOrder._id}/assign`, { tableNumber: Number(tableNumber) }, { headers: { Authorization: `Bearer ${token}` } });
			setOrders((prev) => prev.map((o) => (o._id === assigningOrder._id ? data.order : o)));
			setAssigningOrder(null);
			setTableNumber('');
		} catch (err) {
			alert(err.response?.data?.error || 'Failed to assign table');
		}
	};

	if (loading) {
		return <p className="text-center mt-20 text-yellow-400 text-lg animate-pulse">Loading orders...</p>;
	}

	if (!token || !admin) {
		return (
			<div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-center text-white p-6">
				<h2 className="text-3xl font-bold mb-3 text-yellow-400">Access Restricted</h2>
				<p className="text-gray-300 mb-6">
					Please login as a <span className="font-semibold">restaurant admin</span> to view orders.
				</p>
				<Link
					to="/login"
					className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition">
					Go to Admin Login
				</Link>
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white p-6">
				<p className="text-xl text-gray-300 mb-6">No customer orders yet.</p>
				<Link
					to="/menu"
					className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition">
					View Menu
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
			<h1 className="text-3xl md:text-4xl pt-10 font-bold text-yellow-400 text-center mb-8">Customer Orders</h1>

			<div className="max-w-5xl mx-auto space-y-6">
				{orders.map((order) => (
					<motion.div
						key={order._id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
						{/* Customer Details */}
						<div className="mb-4">
							<p className="font-semibold text-lg text-yellow-400">{order.user?.name || 'Guest User'}</p>
							{order.user?.email && <p className="text-gray-400 text-sm">{order.user.email}</p>}
							{order.phone && <p className="text-gray-300 text-sm">Phone: {order.phone}</p>}
							{order.specialInstructions && <p className="text-yellow-400 text-sm italic mt-1">Special Note: “{order.specialInstructions}”</p>}
							<p className="text-gray-300 text-sm mt-1">
								<strong>Status:</strong> <span className={`font-medium ${order.status === 'Cancelled' ? 'text-red-400' : order.status === 'Table Assigned' ? 'text-green-400' : order.status === 'Done' ? 'text-blue-400' : order.status === 'Table Requested' ? 'text-orange-400' : 'text-yellow-400'}`}>{order.status}</span>
							</p>
							{order.tableNumber && <p className="text-green-400 font-medium mt-1">Table: {order.tableNumber}</p>}
							<p className="text-gray-400 text-sm">Ordered: {new Date(order.createdAt).toLocaleString()}</p>
							{order.status !== 'Pending' && <p className="text-gray-400 text-sm">Updated: {new Date(order.updatedAt).toLocaleString()}</p>}
						</div>

						<div className="space-y-3">
							{order.items.map((item) => {
								const food = item.food;

								if (!food) {
									return (
										<div
											key={item._id || Math.random()}
											className="flex items-center gap-4 bg-gray-700/40 p-3 rounded-xl border border-red-500/30">
											<div className="w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center text-xs text-gray-400">Deleted</div>
											<div>
												<p className="font-semibold text-red-400">Item removed</p>
												<p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
											</div>
										</div>
									);
								}

								return (
									<div
										key={food._id}
										className="flex items-center gap-4 bg-gray-700/40 p-3 rounded-xl">
										<img
											src={food.imageUrl || 'https://via.placeholder.com/64/666/fff?text=Food'}
											alt={food.name}
											className="w-16 h-16 rounded-xl object-cover"
											onError={(e) => {
												e.target.src = 'https://via.placeholder.com/64/666/fff?text=Food';
											}}
										/>
										<div className="flex-1">
											<p className="font-semibold">{food.name}</p>
											<p className="text-gray-400 text-sm">
												₹{food.price} × {item.quantity} = ₹{food.price * item.quantity}
											</p>
										</div>
									</div>
								);
							})}
						</div>

						<p className="mt-4 text-gray-300 font-semibold text-lg">
							Total: ₹
							{order.items.reduce((acc, i) => {
								if (!i.food) return acc;
								return acc + i.food.price * i.quantity;
							}, 0)}
						</p>

						<div className="mt-4 flex gap-2 flex-wrap">
							{!order.tableNumber && order.status === 'Table Requested' && (
								<button
									onClick={() => setAssigningOrder(order)}
									className="px-4 py-2 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition">
									Assign Table
								</button>
							)}

							{order.tableNumber && order.status === 'Table Assigned' && (
								<button
									onClick={() => handleMarkAsDone(order._id)}
									className="px-4 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition flex items-center gap-2">
									Done
								</button>
							)}

							{order.status === 'Done' && <span className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium">Done user Payed</span>}
							{order.status === 'Cancelled' && <span className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium">Cancelled By User</span>}
						</div>
					</motion.div>
				))}
			</div>

			{/* Table Assign Modal */}
			{assigningOrder && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="bg-gray-900 text-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
						<h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Assign Table</h2>
						<p className="text-center text-lg mb-2">{assigningOrder.user?.name || 'Guest'}</p>
						<div className="text-center text-gray-300 mb-4 text-sm">
							{assigningOrder.phone && <p>Phone: {assigningOrder.phone}</p>}
							{assigningOrder.specialInstructions && <p className="italic text-yellow-400 mt-1">“{assigningOrder.specialInstructions}”</p>}
						</div>

						<input
							type="number"
							min="1"
							max="40"
							placeholder="Table number only (1-40)"
							value={tableNumber}
							onChange={(e) => {
								const val = e.target.value;
								if (val === '' || (Number(val) >= 1 && Number(val) <= 40)) {
									setTableNumber(val);
								}
							}}
							className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 mb-4"
						/>
						<div className="flex justify-end gap-3">
							<button
								onClick={() => {
									setAssigningOrder(null);
									setTableNumber('');
								}}
								className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition">
								Cancel
							</button>
							<button
								onClick={handleAssignTable}
								className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-500 transition">
								Assign
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</div>
	);
}
