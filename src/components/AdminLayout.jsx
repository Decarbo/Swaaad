import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './AdminNavbar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout() {
	return (
		<div className="bg-gray-900 min-h-screen">
			<AdminNavbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
