import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSearch, resetFilters, setRestaurant } from '../../redux/slice/filterSlice';

export default function FilterBar({ foods }) {
	const dispatch = useDispatch();
	const { category, search, restaurant } = useSelector((state) => state.filter);

	// ✅ Ensure foods is always an array before mapping
	const restaurantOptions = useMemo(() => {
		if (!Array.isArray(foods) || foods.length === 0) return ['all'];

		// Extract restaurant names safely
		const names = foods
			.map((item) => item?.shopkeeper?.restaurantName)
			.filter(Boolean) // remove undefined/null
			.map((name) => name.toLowerCase()); // normalize for consistent comparison

		console.log('Available restaurants:', names);

		// If nothing found, fallback to 'all'
		if (names.length === 0) return ['all'];

		// Return unique list with original casing preserved for display
		const uniqueNames = [...new Set(names)];
		const displayNames = foods.filter((food) => uniqueNames.includes(food.shopkeeper?.restaurantName?.toLowerCase())).map((food) => food.shopkeeper?.restaurantName);

		return ['all', ...new Set(displayNames)];
	}, [foods]);

	const categories = ['all', 'veg', 'non-veg', 'pizza', 'dessert', 'beverage'];

	return (
		<div className="container mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700">
			{/* 🔍 Search Bar */}
			<input
				type="text"
				placeholder="Search for food..."
				value={search}
				onChange={(e) => dispatch(setSearch(e.target.value))}
				className="px-4 py-2 rounded-lg bg-gray-800 text-white w-full md:w-1/3 focus:ring-2 focus:ring-yellow-400 outline-none"
			/>

			{/* 🏪 Restaurant Dropdown */}
			<select
				value={restaurant}
				onChange={(e) => dispatch(setRestaurant(e.target.value))}
				className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none w-full md:w-auto">
				{restaurantOptions.map((r) => (
					<option
						key={r}
						value={r}>
						{r === 'all' ? 'All Restaurants' : r}
					</option>
				))}
			</select>

			{/* 🍽️ Category Filter */}
			<div className="flex flex-wrap justify-center gap-2">
				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => dispatch(setCategory(cat))}
						className={`px-5 py-2 rounded-full border transition-all capitalize ${category === cat ? 'bg-yellow-400 text-black font-semibold shadow-md' : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'}`}>
						{cat}
					</button>
				))}
			</div>

			{/* 🔄 Reset Filters */}
			<button
				onClick={() => dispatch(resetFilters())}
				className="text-sm text-gray-400 hover:text-yellow-400 transition-all whitespace-nowrap">
				Reset Filters
			</button>
		</div>
	);
}
