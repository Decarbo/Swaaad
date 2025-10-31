// Register.jsx
import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    try {
      await axios.post('/auth/register', data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  return <AuthForm onSubmit={handleRegister} isRegister={true} />;
}
