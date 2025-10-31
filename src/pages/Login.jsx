import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../redux/slice/adminSlice';

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleLogin = async (data) => {
		setLoading(true);
		try {
			const response = await axios.post('/auth/login', data);

			// Make sure your API sends token and shopkeeper info
			const { shopkeeper, token } = response.data;

			if (!token) {
				alert('Login failed: token missing');
				return;
			}

			// Store both admin info and token in Redux
			dispatch(
				setAdmin({
					admin: shopkeeper,
					token,
				})
			);

			navigate('/dashboard');
		} catch (err) {
			console.error(err.response);
			alert(err?.response?.data?.error || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthForm
			onSubmit={handleLogin}
			isRegister={false}
			loading={loading}
		/>
	);
}
