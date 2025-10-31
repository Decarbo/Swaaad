import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../api/axios';

export default function EditFoodFormDark({ food, onClose, onUpdate }) {
	const [formData, setFormData] = useState({
		name: food.name,
		price: food.price,
		description: food.description,
		category: food.category,
		isAvailable: food.isAvailable,
		imageUrl: food.imageUrl || '',
	});
	const [imageFile, setImageFile] = useState(null);
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleImageChange = (e) => setImageFile(e.target.files[0]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const data = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			if (value !== undefined) data.append(key, value);
		});
		if (imageFile) data.append('image', imageFile);

		try {
			const res = await axios.put(`/foods/${food._id}`, data, {
				headers: { 'Content-Type': 'multipart/form-data' },
				withCredentials: true,
			});
			onUpdate(res.data);
			onClose();
		} catch (err) {
			setError(err.response?.data?.error || 'Update failed');
		}
	};
	const handleSearchImage = () => {
		if (!formData.name.trim()) return; // avoid empty search
		const query = encodeURIComponent(formData.name + ' food');
		const url = `https://www.google.com/search?tbm=isch&q=${query}`;
		window.open(url, '_blank'); // opens in a new tab
	};
	return (
		<div className="fixed inset-0 bg-black/80 bg-opacity-70 flex justify-center items-center z-50">
			<motion.form
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				transition={{ duration: 0.3 }}
				onSubmit={handleSubmit}
				className="bg-gray-900/80 backdrop-blur-md p-6 rounded-3xl w-full max-w-md space-y-4 border border-gray-700 shadow-xl">
				<h2 className="text-2xl font-bold text-yellow-400 text-center">Edit Food</h2>

				{error && <p className="text-red-500 text-center">{error}</p>}

				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Food Name"
					required
					className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
				/>

				<input
					type="number"
					name="price"
					value={formData.price}
					onChange={handleChange}
					placeholder="Price (₹)"
					required
					className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
				/>

				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Description"
					className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
				/>

				<input
					type="text"
					name="category"
					value={formData.category}
					onChange={handleChange}
					placeholder="Category"
					required
					className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
				/>

				<label className="flex items-center gap-2 text-white">
					<input
						type="checkbox"
						name="isAvailable"
						checked={formData.isAvailable}
						onChange={handleChange}
						className="accent-green-500 w-5 h-5"
					/>
					Available
				</label>

				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="w-full p-2 border border-gray-600 rounded-lg text-white bg-gray-800"
				/>

				<input
					type="text"
					name="imageUrl"
					value={formData.imageUrl}
					onChange={handleChange}
					placeholder="Or paste image URL"
					className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
				/>
				<button
					type="button"
					onClick={handleSearchImage}
					className="w-full py-2 bg-[#FFB900] text-white font-semibold rounded-lg hover:bg-[#FFB900]/80 transition">
					Search Food Image
				</button>
				<div className="flex justify-between gap-4 mt-4">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type="submit"
						className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
						Update
					</motion.button>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type="button"
						onClick={onClose}
						className="flex-1 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition">
						Cancel
					</motion.button>
				</div>
			</motion.form>
		</div>
	);
}
