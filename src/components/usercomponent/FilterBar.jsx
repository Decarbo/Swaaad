import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSearch, resetFilters, setRestaurant } from '../../redux/slice/filterSlice';
import { Search, X, Filter } from 'lucide-react';

export default function FilterBar({ foods = [] }) {
	const dispatch = useDispatch();
	const { category, search, restaurant } = useSelector((state) => state.filter);

	// Memoized unique restaurants
	const restaurantOptions = useMemo(() => {
		if (!foods.length) return ['all'];
		const names = foods.map((item) => item?.shopkeeper?.restaurantName?.trim()).filter(Boolean);
		const unique = [...new Set(names)];
		return ['all', ...unique];
	}, [foods]);

	const categories = ['all', 'veg', 'non-veg', 'pizza', 'dessert', 'beverage'];

	return (
		<div className="w-full container mx-auto mb-8 bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-xl p-4 sm:p-1 md:p-2">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				{/* Search Bar */}
				<div className="relative flex-1 min-w-0 lg:max-w-md">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search food, restaurant..."
						value={search}
						onChange={(e) => dispatch(setSearch(e.target.value))}
						className="w-full pl-10 pr-10 py-2.5 bg-gray-800/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
					/>
					{search && (
						<button
							onClick={() => dispatch(setSearch(''))}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
							aria-label="Clear search">
							<X className="w-4 h-4" />
						</button>
					)}
				</div>

				{/* Mobile Filter Toggle (Hidden on lg+) */}
				<div className="flex justify-between items-center lg:hidden">
					<span className="text-sm font-medium text-gray-300">Filters</span>
					<button
						onClick={() => {
							const dropdown = document.getElementById('mobile-filters');
							dropdown.classList.toggle('hidden');
						}}
						className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
						<Filter className="w-5 h-5" />
					</button>
				</div>

				{/* Filters Row (Hidden on mobile, shown on lg) */}
				<div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
					{/* Restaurant Dropdown */}
					<select
						value={restaurant}
						onChange={(e) => dispatch(setRestaurant(e.target.value))}
						className="px-4 py-2.5 bg-gray-800/70 border border-gray-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all min-w-[160px]">
						{restaurantOptions.map((r) => (
							<option
								key={r}
								value={r}>
								{r === 'all' ? 'All Restaurants' : r}
							</option>
						))}
					</select>

					{/* Category Pills */}
					<div className="flex flex-wrap gap-2">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => dispatch(setCategory(cat))}
								className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all duration-200 whitespace-nowrap ${category === cat ? 'bg-yellow-400 text-black shadow-md' : 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 hover:border-gray-500'}`}>
								{cat === 'all' ? 'All' : cat}
							</button>
						))}
					</div>

					{/* Reset Button */}
					{(category !== 'all' || search || restaurant !== 'all') && (
						<button
							onClick={() => dispatch(resetFilters())}
							className="text-xs text-gray-400 hover:text-yellow-400 font-medium transition-colors flex items-center gap-1">
							<X className="w-3.5 h-3.5" />
							Reset
						</button>
					)}
				</div>
			</div>

			{/* Mobile Filters Dropdown */}
			<div
				id="mobile-filters"
				className="hidden lg:hidden mt-4 space-y-4">
				{/* Restaurant */}
				<select
					value={restaurant}
					onChange={(e) => dispatch(setRestaurant(e.target.value))}
					className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
					{restaurantOptions.map((r) => (
						<option
							key={r}
							value={r}>
							{r === 'all' ? 'All Restaurants' : r}
						</option>
					))}
				</select>

				{/* Categories */}
				<div className="flex flex-wrap gap-2">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => dispatch(setCategory(cat))}
							className={`flex-1 min-w-fit px-4 py-2 rounded-full text-xs font-medium capitalize transition-all ${category === cat ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-gray-300 border border-gray-600'}`}>
							{cat === 'all' ? 'All' : cat}
						</button>
					))}
				</div>

				{/* Reset */}
				{(category !== 'all' || search || restaurant !== 'all') && (
					<button
						onClick={() => dispatch(resetFilters())}
						className="w-full py-2.5 bg-red-600/20 text-red-400 rounded-xl text-sm font-medium hover:bg-red-600/30 transition-colors">
						Reset All Filters
					</button>
				)}
			</div>
		</div>
	);
}
