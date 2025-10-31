import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function AdminDashboard() {
	const [stats, setStats] = useState({
		totalFoods: 0,
		totalOrders: 0,
		revenue: 0,
	});

	useEffect(() => {
		// Fetch dashboard stats
		const fetchStats = async () => {
			try {
				const res = await axios.get('/admin/stats', { withCredentials: true });
				setStats(res.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchStats();
	}, []);

	const cards = [
		{ title: 'Total Foods', value: stats.totalFoods, link: '/admin/foods' },
		{ title: 'Total Orders', value: stats.totalOrders, link: '/admin/orders' },
		{ title: 'Revenue', value: `$${stats.revenue}`, link: '/admin/dashboard' },
	];

	const quickActions = [
		{ name: 'Add Food', path: '/admin/add-food', color: 'bg-yellow-500' },
		{ name: 'Manage Foods', path: '/admin/foods', color: 'bg-green-500' },
		{ name: 'View Orders', path: '/admin/orders', color: 'bg-blue-500' },
		{ name: 'Profile', path: '/admin/profile', color: 'bg-purple-500' },
	];

	return (
		<motion.div
			className="p-6 space-y-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}>
			{/* Welcome Banner */}
			<motion.div
				className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg"
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				<h1 className="text-3xl font-bold mb-2">Welcome, Restaurant Owner!</h1>
				<p className="text-gray-300">Manage your restaurant efficiently from this panel.</p>
			</motion.div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{cards.map((card) => (
					<motion.div
						key={card.title}
						className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
						whileHover={{ scale: 1.05 }}>
						<h3 className="text-lg font-semibold text-gray-600">{card.title}</h3>
						<p className="mt-2 text-2xl font-bold text-gray-900">{card.value}</p>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
