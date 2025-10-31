import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthFormDark({ onSubmit, isRegister }) {
	const [form, setForm] = useState({ name: '', email: '', password: '', restaurantName: '' });
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: '' });
	};

	const validate = () => {
		const newErrors = {};
		if (isRegister && !form.name.trim()) newErrors.name = 'Full name is required';
		if (isRegister && !form.restaurantName.trim()) newErrors.restaurantName = 'Restaurant name is required';
		if (!form.email.trim()) newErrors.email = 'Email is required';
		if (!form.password.trim()) newErrors.password = 'Password is required';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) onSubmit(form);
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
			<motion.div
				className="absolute w-72 h-72 bg-[#FFB900]/20 rounded-full top-10 -left-16 filter blur-3xl animate-spin-slow"
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 120, ease: 'linear' }}
			/>
			<motion.div
				className="absolute w-56 h-56 bg-[#0078D4]/20 rounded-full bottom-10 -right-10 filter blur-2xl animate-spin-slow"
				animate={{ rotate: -360 }}
				transition={{ repeat: Infinity, duration: 100, ease: 'linear' }}
			/>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="relative z-10 w-full max-w-md bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-3xl shadow-xl p-8">
				<h2 className="text-3xl font-bold text-[#FFB900] mb-6 text-center">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>

				<form
					className="space-y-5"
					onSubmit={handleSubmit}>
					{isRegister && (
						<>
							<div>
								<label className="block text-gray-200 font-medium mb-1">Full Name</label>
								<input
									name="name"
									value={form.name}
									onChange={handleChange}
									placeholder="John Doe"
									className={`w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border ${errors.name ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-[#FFB900]`}
								/>
								{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
							</div>

							<div>
								<label className="block text-gray-200 font-medium mb-1">Restaurant Name</label>
								<input
									name="restaurantName"
									value={form.restaurantName}
									onChange={handleChange}
									placeholder="Swaaad"
									className={`w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border ${errors.restaurantName ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-[#FFB900]`}
								/>
								{errors.restaurantName && <p className="text-red-500 text-sm mt-1">{errors.restaurantName}</p>}
							</div>
						</>
					)}

					<div>
						<label className="block text-gray-200 font-medium mb-1">Email</label>
						<input
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
							placeholder="john@example.com"
							className={`w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-[#FFB900]`}
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
					</div>

					<div className="relative">
						<label className="block text-gray-200 font-medium mb-1">Password</label>
						<input
							name="password"
							type={showPassword ? 'text' : 'password'}
							value={form.password}
							onChange={handleChange}
							placeholder="********"
							className={`w-full p-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border ${errors.password ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-[#FFB900]`}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-11 text-yellow-300 hover:text-white">
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
						{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
					</div>

					<motion.button
						type="submit"
						whileHover={{ scale: 1.03, boxShadow: '0px 0px 15px rgba(255, 185, 0, 0.6)' }}
						whileTap={{ scale: 0.97 }}
						className="w-full py-3 bg-[#FFB900] text-[#323130] rounded-xl font-bold mt-4 transition-all duration-300">
						{isRegister ? 'Register' : 'Login'}
					</motion.button>
				</form>

				<p className="text-gray-300 text-center mt-4 text-sm">
					{isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
					<span
						className="text-[#FFB900] font-semibold cursor-pointer hover:underline"
						onClick={() => navigate(isRegister ? '/login' : '/register')}>
						{isRegister ? 'Login' : 'Register'}
					</span>
				</p>
			</motion.div>
		</div>
	);
}
