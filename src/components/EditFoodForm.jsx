import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../api/axios';
import { X, Link, AlertCircle, Check, Image as ImageIcon } from 'lucide-react';

export default function EditFoodFormDark({ food, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: food.name || '',
    price: food.price || '',
    description: food.description || '',
    category: food.category || '',
    isAvailable: food.isAvailable ?? true,
    imageUrl: food.imageUrl || '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== '') data.append(key, value);
    });

    try {
      const res = await axios.put(`/foods/${food._id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      onUpdate(res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchImage = () => {
    if (!formData.name.trim()) return;
    const query = encodeURIComponent(`${formData.name} food high quality`);
    window.open(`https://www.google.com/search?tbm=isch&q=${query}`, '_blank');
  };

  const isValid = formData.name && formData.price && formData.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Click outside to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.form
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
        style={{ maxHeight: '90vh' }} // Prevents full height
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-5 border-b border-gray-700 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
              <ImageIcon className="w-6 h-6" />
              Edit Food
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 160px)' }}>
          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Image URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Food Image URL
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/food.jpg"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button
                type="button"
                onClick={handleSearchImage}
                className="px-4 py-2.5 bg-[#FFB900] text-gray-900 font-bold rounded-xl hover:bg-[#FFB900]/90 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Search
              </button>
            </div>

            {/* Live Preview */}
            {formData.imageUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3"
              >
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border border-gray-600"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-red-400 text-sm text-center mt-2">
                  Invalid image URL
                </div>
              </motion.div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Margherita Pizza"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="299"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Pizza, Dessert, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                placeholder="Freshly baked with mozzarella and basil..."
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isAvailable"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="w-5 h-5 text-green-500 rounded focus:ring-green-400 accent-green-500"
              />
              <label htmlFor="isAvailable" className="text-white font-medium cursor-pointer">
                Available for order
              </label>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-5 bg-gray-800/50 border-t border-gray-700 flex gap-3 sticky bottom-0 z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isValid || loading}
            className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Check className="w-5 h-5" />
                Update Food
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-500 transition-all"
          >
            Cancel
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
