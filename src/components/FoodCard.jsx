import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Pizza, IceCream, Leaf } from 'lucide-react';
import EditFoodForm from './EditFoodForm';
import ShimmerGrid from './shimer/ShimmerGrid';

export default function FoodCard({ foods, onEdit, onDelete }) {
	const [editingFood, setEditingFood] = useState(null);
	const BASE_URL = import.meta.env.VITE_API_BASE || 'https://swaaad-backend.onrender.com';
	const [foodToDelete, setFoodToDelete] = useState(null);
	const [loading, setLoading] = useState(true);
	const categoryIcons = {
		beverage: <Coffee className="w-6 h-6 text-yellow-400" />,
		pizza: <Pizza className="w-6 h-6 text-yellow-400" />,
		dessert: <IceCream className="w-6 h-6 text-yellow-400" />,
		vegan: <Leaf className="w-6 h-6 text-green-500" />,
	};
	return (
		<>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: {
						transition: { staggerChildren: 0.1 },
					},
				}}
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto">
				{foods.map((food, idx) => (
					<motion.div
						key={food._id}
						whileHover={{ scale: 1.01 }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.2, delay: idx * 0.1 }}
						className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 relative">
						{/* Image Section */}
						<div className="h-48 bg-gray-800 flex items-center justify-center relative">
							{food.imageUrl ? (
								<img
									src={food.imageUrl}
									alt={food.name}
									className="object-cover rounded-t-lg   hover:scale-105 transition-transform duration-300 h-full w-full"
								/>
							) : (
								<span className="text-gray-500 text-sm">No image available</span>
							)}

							<motion.span
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full ${food.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
								whileHover={{ scale: 1.2 }}>
								{food.isAvailable ? 'Available' : 'Unavailable'}
							</motion.span>
						</div>

						<div className="p-5 space-y-2">
							<h3 className="text-xl font-bold text-white flex items-center gap-2 capitalize">{food.name}</h3>
							<p className="text-green-400 font-semibold text-lg">₹{food.price}</p>
							<p className="text-gray-300 text-sm">{food.description || 'No description provided.'}</p>
							<p className="text-gray-400 text-xs">Category: {food.category || 'Uncategorized'}</p>

							<div className="flex gap-3 mt-4">
								<motion.button
									onClick={() => setEditingFood(food)}
									whileHover={{ scale: 1.03 }}
									className="flex-1 px-3 py-2 cursor-pointer bg-yellow-400 text-white rounded-xl font-semibold hover:bg-yellow-400/70 transition">
									Edit
								</motion.button>
								<motion.button
									onClick={() => setFoodToDelete(food)}
									whileHover={{ scale: 1.03 }}
									className="flex-1 px-3 py-2 cursor-pointer bg-[#D13438] text-white rounded-xl font-semibold hover:bg-red-700 transition">
									Delete
								</motion.button>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>

			{editingFood && (
				<EditFoodForm
					food={editingFood}
					onClose={() => setEditingFood(null)}
					onUpdate={onEdit}
				/>
			)}
			{foodToDelete && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="bg-gray-900/80 backdrop-blur-md p-6 rounded-3xl w-full max-w-sm text-white border border-gray-700 shadow-lg">
						<p className="text-lg">
							Are you sure you want to delete <span className="font-semibold text-red-500">"{foodToDelete.name}"</span>?
						</p>
						<div className="flex justify-between gap-4 mt-6">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => {
									onDelete(foodToDelete._id);
									setFoodToDelete(null);
								}}
								className="flex-1 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition font-semibold">
								Yes
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setFoodToDelete(null)}
								className="flex-1 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition font-semibold">
								No
							</motion.button>
						</div>
					</motion.div>
				</div>
			)}
		</>
	);
}
