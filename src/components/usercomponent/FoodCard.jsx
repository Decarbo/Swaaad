import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Coffee,
  Pizza,
  IceCream,
  Leaf,
  Star,
  ShoppingCart,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slice/cartSlice';

const categoryIcons = {
  beverage: <Coffee className="w-5 h-5 text-yellow-400" />,
  pizza: <Pizza className="w-5 h-5 text-yellow-400" />,
  dessert: <IceCream className="w-5 h-5 text-pink-400" />,
  vegan: <Leaf className="w-5 h-5 text-green-400" />,
};

const FoodCard = memo(({ food, idx }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (food.isAvailable) {
      dispatch(addToCart(food));
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, delay: idx * 0.02 }}
      className="bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* ---------- IMAGE ---------- */}
      <div className="relative aspect-square max-h-60 overflow-hidden rounded-t-3xl">
        <img
          src={food.imageUrl || '/placeholder-food.jpg'}
          alt={food.name}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Availability badge */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
            food.isAvailable
              ? 'bg-green-500 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {food.isAvailable ? 'Available' : 'Unavailable'}
        </motion.span>

        {/* Special badge */}
        {food.isSpecial && (
          <div className="absolute top-3 left-3 bg-yellow-500/90 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star className="w-3.5 h-3.5" /> Special
          </div>
        )}
      </div>

      {/* ---------- INFO ---------- */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div className="space-y-3">
          {/* Title & Price */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold capitalize flex items-center gap-2">
              {categoryIcons[food.category?.toLowerCase()] || (
                <Leaf className="w-5 h-5 text-gray-400" />
              )}
              {food.name}
            </h3>
            <p className="text-yellow-400 font-bold text-lg whitespace-nowrap">
              ₹{food.price}
            </p>
          </div>

          {/* Category */}
          <p className="text-sm text-gray-400">
            Category:{' '}
            <span className="text-gray-200 font-medium capitalize">
              {food.category || 'General'}
            </span>
          </p>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-snug">
            {food.description || 'No description provided.'}
          </p>

          {/* Tags */}
          {food.tags && food.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {food.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 text-xs rounded-full border ${
                    tag.toLowerCase() === 'spicy'
                      ? 'border-red-500 text-red-400'
                      : tag.toLowerCase() === 'veg'
                      ? 'border-green-500 text-green-400'
                      : 'border-gray-500 text-gray-400'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Shopkeeper */}
          {food.shopkeeper && (
            <div className="mt-3 text-xs text-gray-500">
              <span className="text-gray-400">From:</span>{' '}
              <span className="text-gray-200 font-medium">
                {food.shopkeeper.restaurantName || 'Unknown Restaurant'}
              </span>
            </div>
          )}
        </div>

        {/* ---------- BUTTONS ---------- */}
        <div className="mt-6 flex justify-between items-center gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!food.isAvailable}            
            className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-xl shadow transition-all text-sm ${
              food.isAvailable
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />{' '}
            {food.isAvailable ? 'Add' : 'Unavailable'}
          </button>

          <Link
            to={`/food/${food._id}`}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-all"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
});

export default FoodCard;
