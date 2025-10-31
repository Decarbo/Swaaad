import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, IceCream, Drumstick, Coffee } from 'lucide-react';

const menuData = [
  {
    title: ' Veg Dishes',
    icon: <Utensils className="w-6 h-6 text-green-400" />,
    color: 'from-green-600/20 via-green-500/10 to-transparent',
    items: [
      { name: 'Paneer Butter Masala', price: 180, desc: 'Creamy tomato gravy with soft paneer cubes.' },
      { name: 'Dal Tadka', price: 120, desc: 'Lentils tempered with ghee, garlic, and cumin.' },
      { name: 'Veg Biryani', price: 160, desc: 'Fragrant rice with vegetables and aromatic spices.' },
      { name: 'Palak Paneer', price: 190, desc: 'Spinach curry with fresh cottage cheese.' },
      { name: 'Veg Thali', price: 250, desc: 'Complete meal with chapati, dal, rice, and curry.' },
    ],
  },
  {
    title: ' Non-Veg Specials',
    icon: <Drumstick className="w-6 h-6 text-red-400" />,
    color: 'from-red-600/20 via-red-500/10 to-transparent',
    items: [
      { name: 'Butter Chicken', price: 280, desc: 'Classic creamy tomato gravy with tender chicken.' },
      { name: 'Mutton Rogan Josh', price: 320, desc: 'Rich Kashmiri-style curry with bold spices.' },
      { name: 'Chicken Biryani', price: 240, desc: 'Flavourful biryani with spiced chicken pieces.' },
      { name: 'Fish Curry', price: 270, desc: 'Tangy coastal curry with fresh-caught fish.' },
      { name: 'Prawn Masala', price: 290, desc: 'Juicy prawns cooked in a spicy coconut sauce.' },
    ],
  },
  {
    title: ' Ice Creams & Desserts',
    icon: <IceCream className="w-6 h-6 text-pink-400" />,
    color: 'from-pink-600/20 via-pink-400/10 to-transparent',
    items: [
      { name: 'Chocolate Lava Cake', price: 160, desc: 'Molten chocolate core served warm.' },
      { name: 'Vanilla Bean Scoop', price: 80, desc: 'Classic vanilla made from real beans.' },
      { name: 'Strawberry Sundae', price: 120, desc: 'Fresh strawberries layered with ice cream.' },
      { name: 'Brownie with Ice Cream', price: 150, desc: 'Rich brownie topped with vanilla scoop.' },
      { name: 'Falooda', price: 130, desc: 'Rose-flavored layered dessert with jelly & nuts.' },
    ],
  },
  {
    title: ' Snacks & Beverages',
    icon: <Coffee className="w-6 h-6 text-yellow-400" />,
    color: 'from-yellow-600/20 via-yellow-500/10 to-transparent',
    items: [
      { name: 'French Fries', price: 90, desc: 'Crispy golden fries with seasoning.' },
      { name: 'Masala Tea', price: 40, desc: 'Spiced Indian chai brewed with milk.' },
      { name: 'Cold Coffee', price: 110, desc: 'Iced blend of coffee and cream.' },
      { name: 'Garlic Bread', price: 100, desc: 'Toasted baguette with butter and garlic.' },
      { name: 'Spring Rolls', price: 120, desc: 'Crispy rolls filled with vegetables.' },
    ],
  },
];

export default function RestaurantMenu() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font1 pt-14  font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Our Restaurant Menu
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our delightful selection of dishes, handcrafted with love and premium ingredients.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-12">
        {menuData.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl bg-gradient-to-br ${section.color} border border-gray-800/50 shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-6">
              {section.icon}
              <h2 className="text-3xl font-semibold text-white font1">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start border-b border-gray-700/50 pb-3 last:border-none"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-200">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <p className="text-yellow-400 font-semibold text-lg">₹{item.price}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
