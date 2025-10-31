import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import Logout from './Logout';

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const { admin } = useSelector((state) => state.admin);

  console.log('🧩 Admin from Redux:', admin); // Debug check

  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Add Food', path: '/create' },
    { name: 'New Admin', path: '/register' },
    { name: 'Assign Table', path: '/assign-table' },
    { name: 'Table Status', path: '/status' },
  ];

  return (
    <nav className="fixed w-full z-50">
      <div className="container mx-auto mt-2">
        <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700 rounded-2xl flex items-center justify-between h-16 px-4 md:px-6 shadow-lg">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font1 font-extrabold text-[#FFB900] hover:scale-105 transition-transform duration-300"
          >
            Swaaad Admin
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <div key={link.name} className="relative">
                <NavLink to={link.path}>
                  {({ isActive }) => (
                    <motion.span
                      initial={{ opacity: 0.6 }}
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      animate={{ opacity: isActive ? 1 : 0.8 }}
                      className={`px-2 py-1 font-medium transition-colors duration-300 ${
                        isActive
                          ? 'text-[#FFB900]'
                          : 'text-white hover:text-[#FFB900]'
                      }`}
                    >
                      {link.name}
                    </motion.span>
                  )}
                </NavLink>
              </div>
            ))}

            {/* ✅ Admin info + Logout */}
            {admin ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-white">{admin.restaurantName}</p>
                  <p className="text-gray-400">{admin.name}</p>
                </div>
                <Logout />
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
              {open ? (
                <X size={28} className="text-white" />
              ) : (
                <Menu size={28} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 backdrop-blur-md bg-gray-900/40 border border-gray-700 rounded-2xl overflow-hidden"
            >
              <ul className="flex flex-col px-4 py-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-2 font-medium rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'bg-[#FFB900] text-gray-900'
                            : 'text-white hover:bg-[#FFB900] hover:text-gray-900'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}

                {/* ✅ Mobile: Show admin or login */}
                {admin ? (
                  <li className="flex items-center justify-between px-3 pt-3 border-t border-gray-700">
                    <div className="text-sm text-gray-300">
                      <p className="font-semibold">{admin.restaurantName}</p>
                      <p className="text-gray-400">{admin.name}</p>
                    </div>
                    <Logout />
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="block text-center bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg hover:bg-yellow-500 transition"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
