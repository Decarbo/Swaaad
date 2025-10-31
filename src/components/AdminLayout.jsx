import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './AdminNavbar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout() {
	return (
		<>
			<AdminNavbar />
			<main>
				<Outlet /> 
			</main>
		</>
	);
}
