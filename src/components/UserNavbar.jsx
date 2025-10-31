import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import { handleLogout } from '../redux/slice/userSlice';
import Logout from './Logout';

const NavItem = ({ name, path, onClick }) =>
	path ? (
		<NavLink
			to={path}
			onClick={onClick}>
			{({ isActive }) => (
				<motion.span
					initial={{ opacity: 0.7 }}
					whileHover={{ scale: 1.1, opacity: 1 }}
					animate={{ opacity: isActive ? 1 : 0.7 }}
					className={`px-2 py-1 text-[16px] font-medium transition-colors duration-300 ${isActive ? 'text-[#FFB900] border-b-2 border-[#FFB900]' : 'text-white hover:text-[#FFB900]'}`}>
					{name}
				</motion.span>
			)}
		</NavLink>
	) : (
		name
	);

export default function UserNavbar() {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const items = useSelector((state) => state.cart.items);
	const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
	const user = useSelector((state) => state.user.user);

	const publicLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'We Offer', path: '/menu' },
		{ name: 'Login', path: '/user/login' },
		{ name: 'Register', path: '/user/register' },
	];

	const authLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'We Offer', path: '/menu' },
		{ name: 'Orders', path: '/MyOrders' },
		{
			name: 'Logout',
			component: (
				<button
					onClick={() => dispatch(handleLogout())}
					className="bg-red-500 px-3 py-1 rounded-md">
					Logout
				</button>
			),
		},
	];

	const links = user ? authLinks : publicLinks;

	const CartIcon = () => (
		<Link
			to="/cart"
			className="relative flex items-center">
			<motion.div
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.05 }}
				className="text-white cursor-pointer hover:text-[#FFB900]">
				<ShoppingBag size={26} />
			</motion.div>
			{totalItems > 0 && (
				<motion.span
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', stiffness: 300 }}
					className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
					{totalItems}
				</motion.span>
			)}
		</Link>
	);

	return (
		<nav className="fixed w-full z-50 top-0 bg-transparent">
			<div className="container mx-auto mt-2 px-4">
				<div className=" backdrop-blur-md bg-gray-900/40 border border-gray-700 rounded-2xl flex items-center justify-between h-16 px-4 md:px-8 shadow-lg relative">
					{/* Logo */}
					<Link
						to="/"
						className=" font1 text-3xl font-extrabold tracking-wide text-[#FFB900] hover:scale-105 transition-transform duration-300 font1">
						Swaaad
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						{links.map((link) => (
							<div key={link.name}>
								{link.component || (
									<NavItem
										name={link.name}
										path={link.path}
									/>
								)}
							</div>
						))}
						{user && (
							<span className="ml-4 text-[0.7rem] text-white">
								<span className="text-[0.7rem]">Welcome</span>, <br /> {user.name}
							</span>
						)}
						<CartIcon />
					</div>

					{/* Mobile Menu Toggle */}
					<div className="md:hidden flex items-center gap-4">
						<CartIcon />
						<button
							onClick={() => setOpen(!open)}
							aria-label="Toggle Menu">
							{open ? (
								<X
									size={28}
									className="text-white"
								/>
							) : (
								<Menu
									size={28}
									className="text-white"
								/>
							)}
						</button>
					</div>
				</div>

				{/* Mobile Dropdown Menu */}
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="md:hidden mt-2 backdrop-blur-md bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-lg">
							<ul className="flex flex-col px-4 py-4 space-y-3">
								{links.map((link) => (
									<li key={link.name}>
										{link.component || (
											<NavLink
												to={link.path}
												onClick={() => setOpen(false)}
												className={({ isActive }) => `block px-3 py-2 font-medium rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FFB900] text-gray-900' : 'text-white hover:bg-[#FFB900] hover:text-gray-900'}`}>
												{link.name}
											</NavLink>
										)}
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</nav>
	);
}
