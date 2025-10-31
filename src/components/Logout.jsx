// components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../redux/slice/adminSlice';

export default function Logout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = async () => {
		try {
			await axios.post('/auth/logout', {}, { withCredentials: true });
			// Optionally clear frontend state if you store user info
			// e.g., setUser(null);
			navigate('/login'); // redirect to login page
		} catch (err) {
			console.error('Logout failed', err);
			alert('Logout failed, try again!');
		}
		dispatch(logoutAdmin());
		navigate('/login');

		dispatch(logoutAdmin());
		localStorage.clear(); // Clear persisted data
	};
	return (
		<button
			onClick={handleLogout}
			className="px-4 py-2 bg-red-500/70 cursor-pointer text-white rounded hover:bg-red-600">
			Logout
		</button>
	);
}
