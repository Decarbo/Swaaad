import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slice/cartSlice';
import axios from '../../api/axios';
import { useQuery } from '@tanstack/react-query';
import ShimmerGrid from '../shimer/ShimmerGrid';

// Fetch a single food by ID
const fetchFoodById = async (id) => {
	const res = await axios.get(`/foods/user/foods/${id}`);
	return res.data;
};

export default function FoodDetail() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const {
		data: food,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['food', id],
		queryFn: () => fetchFoodById(id),
		staleTime: 5 * 60 * 1000, // 5 minutes cache
		refetchOnWindowFocus: false,
	});

	const handleAddToCart = () => {
		if (food) dispatch(addToCart(food));
	};

	if (isLoading) return <ShimmerGrid count={8} />;

	if (error) return <div className="flex justify-center items-center h-screen text-red-500 text-lg">Failed to load food.</div>;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6 flex justify-center items-center">
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.4 }}
				className="max-w-3xl w-full bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8">
				{/* Image */}
				<motion.div
					className="relative overflow-hidden rounded-2xl mb-6"
					whileHover={{ scale: 1.02 }}>
					<img
						src={food.imageUrl || '/placeholder-food.jpg'}
						alt={food.name}
						className="w-full h-80 object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
						loading="lazy"
					/>
					<motion.span
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${food.isAvailable ? 'bg-green-500 text-white' : 'bg-red-600 text-white'}`}>
						{food.isAvailable ? 'Available' : 'Unavailable'}
					</motion.span>
				</motion.div>

				{/* Content */}
				<div>
					<h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">{food.name}</h1>
					<p className="text-gray-300 leading-relaxed mb-4">{food.description || 'No description provided.'}</p>

					<div className="flex justify-between items-center mb-6">
						<span className="text-2xl font-bold text-yellow-400">₹{food.price}</span>
						{food.shopkeeper && (
							<span className="text-gray-400 text-sm">
								🍴 From: <span className="text-gray-200 font-medium">{food.shopkeeper.restaurantName}</span>
							</span>
						)}
					</div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row sm:items-center gap-4">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							disabled={!food.isAvailable}
							onClick={handleAddToCart}
							className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-xl shadow transition-all text-sm ${food.isAvailable ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
							<ShoppingCart className="w-5 h-5" />
							{food.isAvailable ? 'Add' : 'Unavailable'}
						</motion.button>

						<Link
							to="/menu"
							className="flex items-center justify-center gap-2 text-gray-300 hover:text-yellow-400 text-sm transition">
							<ArrowLeft className="w-4 h-4" /> Back to all foods
						</Link>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
