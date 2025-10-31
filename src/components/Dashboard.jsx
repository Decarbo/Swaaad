import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
	const [foods, setFoods] = useState([]);

	useEffect(() => {
		const fetchFoods = async () => {
			try {
				const res = await axios.get('/foods', { withCredentials: true });
				setFoods(res.data);
			} catch (err) {
				console.error('Error fetching foods:', err.response || err);
			}
		};
		fetchFoods();
	}, []);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`/foods/${id}`, { withCredentials: true });
			setFoods((prev) => prev.filter((item) => item._id !== id));
		} catch (err) {
			console.error('Error deleting food:', err.response || err);
		}
	};

	const handleEdit = (updatedFood) => {
		setFoods((prev) => prev.map((item) => (item._id === updatedFood._id ? updatedFood : item)));
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="p-6 min-h-screen bg-gray-900 flex flex-col items-center">
			<h2 className="text-3xl font-bold text-[#FFB900] mb-6 mt-14 text-center">Your Listed Food</h2>

			{foods.length === 0 ? (
				<div className="flex flex-col items-center justify-center mt-20 text-center text-gray-300 space-y-4">
					<Coffee className="w-12 h-12 text-yellow-400 animate-bounce" />
					<h3 className="text-xl font-semibold">No food items listed yet!</h3>
					<p className="text-gray-400 max-w-xs">Start by adding your delicious dishes. They will appear here once you create them.</p>
					<Link to="/login">
						<h4 className="text-xl bg-amber-900/50  rounded-md px-2 font-bold text-[#FFB900] mb-6  text-center">Login To see </h4>
					</Link>
				</div>
			) : (
				<FoodCard
					foods={foods}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}
		</motion.div>
	);
}
