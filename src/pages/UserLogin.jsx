import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/usercomponent/AuthLayout';
import { useDispatch } from 'react-redux';
import { handleLogin, setUser } from '../redux/slice/userSlice';

export default function UserLogin() {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const res = await api.post('/auth/user/login', formData);
			dispatch(
				handleLogin({
					...res.data.user,
					token: res.data.token,
				})
			);
			navigate('/menu');
		} catch (err) {
			setError(err.response?.data?.error || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout title="Welcome Back 👋">
			<form
				onSubmit={handleSubmit}
				className="space-y-4">
				{['email', 'password'].map((field) => (
					<div key={field}>
						<label className="block capitalize text-sm mb-1">{field}</label>
						<input
							type={field === 'password' ? 'password' : 'text'}
							name={field}
							value={formData[field]}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFB900]"
						/>
					</div>
				))}
				{error && <p className="text-red-400 text-sm">{error}</p>}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					type="submit"
					disabled={loading}
					className="w-full bg-[#FFB900] text-gray-900 font-semibold py-2 rounded-lg mt-4">
					{loading ? 'Logging in...' : 'Login'}
				</motion.button>
			</form>
		</AuthLayout>
	);
}
