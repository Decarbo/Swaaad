import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CreateFoodDark() {
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		description: '',
		category: '',
		isAvailable: true,
		imageUrl: '',
		isSpecial: false,
		tags: '',
		shopkeeper: '', // optional for now
	});
	const [imageFile, setImageFile] = useState(null);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSearchImage = () => {
		if (!formData.name.trim()) return;
		const query = encodeURIComponent(formData.name + ' food');
		const url = `https://www.google.com/search?tbm=isch&q=${query}`;
		window.open(url, '_blank');
	};

	const handleImageFileChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const data = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			if (value) {
				// Special handling for tags (string → array)
				if (key === 'tags') {
					const tagsArray = value
						.split(',')
						.map((t) => t.trim())
						.filter((t) => t.length > 0);
					data.append('tags', JSON.stringify(tagsArray));
				} else {
					data.append(key, value);
				}
			}
		});

		if (imageFile) data.append('image', imageFile);

		try {
			await axios.post('/foods', data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			navigate('/dashboard');
		} catch (err) {
			setError(err.response?.data?.error || 'Something went wrong');
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				className="relative z-10 w-full max-w-md bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-3xl shadow-xl p-8">
				<h2 className="text-2xl font-bold text-[#FFB900] mb-6 text-center">
					Add New Food Item
				</h2>

				{error && <p className="text-red-500 mb-2">{error}</p>}

				<form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
					{/* Name */}
					<input
						type="text"
						name="name"
						placeholder="Food Name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB900]"
					/>

					{/* Price */}
					<input
						type="number"
						name="price"
						placeholder="Price (₹)"
						value={formData.price}
						onChange={handleChange}
						required
						className="w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB900]"
					/>

					{/* Description */}
					<textarea
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
						className="w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB900]"
					/>

					{/* Category Dropdown */}
					<select
						name="category"
						value={formData.category}
						onChange={handleChange}
						required
						className="w-full p-3 rounded-xl bg-gray-800/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB900]">
						<option value="">Select Category</option>
						<option value="Veg">Veg</option>
						<option value="Non-Veg">Non-Veg</option>
						<option value="Snacks">Snacks</option>
						<option value="Dessert">Dessert</option>
						<option value="Ice Cream">Ice Cream</option>
						<option value="Beverage">Beverage</option>
					</select>

					{/* Availability */}
					<label className="flex items-center gap-2 text-white">
						<input
							type="checkbox"
							name="isAvailable"
							checked={formData.isAvailable}
							onChange={handleChange}
							className="accent-[#FFB900]"
						/>
						Available
					</label>

					{/* Special Dish */}
					<label className="flex items-center gap-2 text-white">
						<input
							type="checkbox"
							name="isSpecial"
							checked={formData.isSpecial}
							onChange={handleChange}
							className="accent-[#FFB900]"
						/>
						Mark as Special Dish
					</label>

					{/* Tags */}
					<input
						type="text"
						name="tags"
						placeholder="Tags (comma separated, e.g. spicy,veg,gluten-free)"
						value={formData.tags}
						onChange={handleChange}
						className="w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB900]"
					/>

					{/* Image Upload */}
					<input
						type="file"
						accept="image/*"
						onChange={handleImageFileChange}
						className="w-full p-3 rounded-xl bg-gray-800/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB900]"
					/>
					<input
						type="text"
						name="imageUrl"
						placeholder="Or paste image URL"
						value={formData.imageUrl}
						onChange={handleChange}
						className="w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB900]"
					/>

					{/* Image Preview */}
					{imageFile && (
						<div className="mt-2">
							<img
								src={URL.createObjectURL(imageFile)}
								alt="Preview"
								className="w-full rounded-lg shadow-lg"
							/>
						</div>
					)}

					{/* Image Search */}
					<div className="w-full items-center mt-4">
						<motion.button
							type="button"
							onClick={handleSearchImage}
							whileHover={{ scale: 1.03, boxShadow: '0px 0px 15px rgba(255, 185, 0, 0.6)' }}
							whileTap={{ scale: 0.97 }}
							className="py-3 px-4 w-full bg-[#FFB900] text-gray-900 rounded-xl font-bold transition-all duration-300">
							Search Food Image
						</motion.button>
					</div>

					{/* Submit Button */}
					<motion.button
						type="submit"
						whileHover={{ scale: 1.03, boxShadow: '0px 0px 15px rgba(255, 185, 0, 0.6)' }}
						whileTap={{ scale: 0.97 }}
						className="w-full py-3 bg-[#FFB900] text-gray-900 rounded-xl font-bold mt-4 transition-all duration-300">
						Create Food
					</motion.button>
				</form>
			</motion.div>
		</div>
	);
}
