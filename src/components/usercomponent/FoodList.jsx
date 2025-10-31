import React from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import ShimmerGrid from '../shimer/ShimmerGrid';
import FoodCard from './FoodCard';
import FilterBar from './FilterBar'; // ← No props!

const fetchFoods = async () => {
	const res = await axios.get('foods/user/foods');
	return res.data;
};

export default function FoodList() {
	const {
		data: foods = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ['foods'],
		queryFn: fetchFoods,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const { category = 'all', search = '', restaurant = 'all' } = useSelector((state) => state.filter);

	if (isLoading) return <ShimmerGrid count={8} />;
	if (error) return <div className="text-red-500 text-center mt-8">Error loading foods.</div>;

	const filteredFoods = foods.filter((food) => {
		const matchCategory = category === 'all' || food.category?.toLowerCase() === category.toLowerCase();
		const matchSearch = search === '' || food.name?.toLowerCase().includes(search.toLowerCase());
		const matchRestaurant = restaurant === 'all' || food.shopkeeper?.restaurantName?.toLowerCase() === restaurant.toLowerCase();
		return matchCategory && matchSearch && matchRestaurant;
	});

	return (
		<LazyMotion features={domAnimation}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-12 px-6">
				<div className="text-center m-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Explore Our Delicious Foods</h1>
					<p className="text-gray-400 max-w-2xl mx-auto">Handcrafted meals, freshly made by our top restaurants.</p>
				</div>

				{/* FilterBar uses Redux only */}
				<FilterBar />

				<motion.div
					layout
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 container mx-auto">
					{filteredFoods.length > 0 ? (
						filteredFoods.map((food, idx) => (
							<FoodCard
								key={food._id}
								food={food}
								idx={idx}
							/>
						))
					) : (
						<div className="col-span-full text-center text-gray-500 py-12">
							No foods found matching your filters.
							{restaurant !== 'all' && <div className="text-sm mt-2">Try adjusting your restaurant filter or search criteria.</div>}
						</div>
					)}
				</motion.div>
			</motion.div>
		</LazyMotion>
	);
}
