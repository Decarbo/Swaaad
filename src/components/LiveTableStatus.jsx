import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Users, Clock, UtensilsCrossed } from 'lucide-react';

export default function LiveTableStatus() {
	const { token } = useSelector((state) => state.admin);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const BASE_URL = 'https://swaaad-backend.onrender.com/api/user/restaurant/orders';

	useEffect(() => {
		if (!token) return;

		const fetchTables = async () => {
			try {
				const { data } = await axios.get(BASE_URL, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setOrders(data);
			} catch (err) {
				console.error('Failed to fetch tables:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchTables();
		const interval = setInterval(fetchTables, 90000);
		return () => clearInterval(interval);
	}, [token]);

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-[60vh] text-yellow-400 text-lg animate-pulse">
				<UtensilsCrossed className="animate-spin mr-3" /> Loading live tables...
			</div>
		);

	const bookedTables = orders
		.filter((o) => o.tableNumber && o.status !== 'Cancelled')
		.map((o) => ({
			number: o.tableNumber,
			user: o.user?.name || 'Unknown',
			status: o.status,
			specialNote: o.specialInstructions,
		}));

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-gradient-to-br min-h-screen  from-gray-900 via-gray-800 to-black text-white  shadow-2xl p-8 border border-gray-700 relative overflow-hidden">
			<h2 className="text-3xl font-bold mt-14 text-yellow-400 mb-8 text-center flex justify-center items-center gap-3">Live Table</h2>

			<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 relative contain-content container mx-auto p-3">
				{[...Array(40)].map((_, i) => {
					const tableNum = i + 1;
					const booked = bookedTables.find((t) => t.number === tableNum);
					const isAvailable = !booked;

					return (
						<motion.div
							key={tableNum}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: i * 0.01 }}
							whileHover={{
								scale: 1.01,
							}}
							className={`relative rounded-2xl backdrop-blur-lg p-4 text-center cursor-pointer border transition-all duration-300 ${isAvailable ? 'bg-green-400/10 border-green-400 hover:bg-green-400/20' : 'bg-red-400/10 border-red-400 hover:bg-red-400/20'}`}>
							<p className="text-sm text-gray-300 font-semibold">Table</p>
							<p className="text-2xl font-extrabold text-yellow-400">{tableNum}</p>

							<div className={`w-3 h-3 rounded-full mx-auto mt-2  ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>

							{booked && (
								<motion.div
									initial={{ opacity: 0 }}
									whileHover={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
									className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-xs p-2">
									<Users
										className="text-yellow-400 mb-1"
										size={18}
									/>
									<p className="font-semibold">{booked.user}</p>
									<p className="text-gray-400">Status: {booked.status}</p>
									{booked.specialNote && <p className="italic text-gray-400 mt-1 text-center px-1">“{booked.specialNote}”</p>}
								</motion.div>
							)}
						</motion.div>
					);
				})}
			</div>

			<div className="mt-10 flex justify-center gap-6 text-sm">
				<motion.div
					whileHover={{ scale: 1.1 }}
					className="flex items-center gap-2">
					<span className="w-5 h-5 bg-green-400/40 border border-green-400 rounded-full shadow-md shadow-green-400/40 animate-pulse"></span>
					<span className="text-gray-300">Available</span>
				</motion.div>
				<motion.div
					whileHover={{ scale: 1.1 }}
					className="flex items-center gap-2">
					<span className="w-5 h-5 bg-red-400/40 border border-red-400 rounded-full shadow-md shadow-red-400/40 animate-pulse"></span>
					<span className="text-gray-300">Booked</span>
				</motion.div>
			</div>
		</motion.div>
	);
}
