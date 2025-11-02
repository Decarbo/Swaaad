import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './AdminNavbar';
import AdminNavbar from './AdminNavbar';
import UserNavbar from './UserNavbar';

export default function UserLayout() {
	return (
		<div className='bg-gray-900 '>
			<UserNavbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
