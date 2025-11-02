import React, { useMemo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import ShimmerGrid from '../shimer/ShimmerGrid';
import FoodCard from './FoodCard';
import FilterBar from './FilterBar';

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
    retry: 2,
  });

  const { category = 'all', search = '', restaurant = 'all' } = useSelector(
    (state) => state.filter
  );

  // Memoized filtering — avoids re-filtering on every render
  const filteredFoods = useMemo(() => {
    if (!foods.length) return [];

    return foods.filter((food) => {
      const matchCategory =
        category === 'all' ||
        food.category?.toLowerCase() === category.toLowerCase();

      const matchSearch =
        search === '' ||
        food.name?.toLowerCase().includes(search.toLowerCase()) ||
        food.description?.toLowerCase().includes(search.toLowerCase());

      const matchRestaurant =
        restaurant === 'all' ||
        food.shopkeeper?.restaurantName?.toLowerCase() ===
          restaurant.toLowerCase();

      return matchCategory && matchSearch && matchRestaurant;
    });
  }, [foods, category, search, restaurant]);

  // Loading & Error States
  if (isLoading) return <ShimmerGrid count={8} />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-md">
          <h3 className="text-xl font-bold text-red-400 mb-2">
            Oops! Something went wrong.
          </h3>
          <p className="text-sm text-gray-400">
            We couldn't load the menu. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white pt-14"
      >
        {/* Hero Section */}
        <header className="text-center py-12 px-6 sm:py-16 lg:py-20">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
          >
            Explore Our <span className='font1 italic text-yellow-400' >Delicious</span> Foods
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Handcrafted meals, freshly made by top local restaurants. Order now
            and enjoy!
          </motion.p>
        </header>

        {/* Filter Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-4 sm:px-6 lg:px-8 mb-8"
        >
          <FilterBar foods={foods} />
        </motion.div>

        {/* Food Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food, idx) => (
                <motion.div
                  key={food._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <FoodCard food={food} idx={idx} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-6xl mb-4">No foods found</div>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your filters or search term.
                  </p>
                  {(search || category !== 'all' || restaurant !== 'all') && (
                    <p className="text-xs text-gray-500 mt-3">
                      Active filters:{' '}
                      {[search && `"${search}"`, category !== 'all' && category, restaurant !== 'all' && restaurant]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>
      </motion.div>
    </LazyMotion>
  );
}
