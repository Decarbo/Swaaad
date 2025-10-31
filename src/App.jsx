import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import CreateFood from './components/CreateFood';
import AdminDashboard from './components/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';
import FoodDetail from './components/usercomponent/FoodDetail';
import FoodList from './components/usercomponent/FoodList';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import CartPage from './pages/CartPage';
import MyOrders from './components/usercomponent/MyOrders';
import RestaurantOrders from './components/RestaurantOrders';
import RestaurantMenu from './components/RestaurantMenu';
import TableStatus from './components/LiveTableStatus';
import LiveTableStatus from './components/LiveTableStatus';
import Hero from './components/usercomponent/Hero';
function App() {
	return (
		<Routes>
			{/* Routes with Navbar */}
			{/* <Route element={<AdminLayout />}>

				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>

				<Route
					path="/admin"
					element={<Dashboard />}
				/>
				<Route
					path="/create"
					element={<CreateFood />}
				/>
				<Route
					path="/assign-table"
					element={<RestaurantOrders />}
				/>
			</Route> */}
			<Route element={<AdminLayout />}>
				<Route
					path="/admin/"
					element={<Dashboard />}
				/>
				<Route
					path="/dashboard"
					element={<Dashboard />}
				/>
				<Route
					path="/create"
					element={<CreateFood />}
				/>
				<Route
					path="/status"
					element={<LiveTableStatus />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/assign-table"
					element={<RestaurantOrders />}
				/>
			</Route>
			<Route element={<UserLayout />}>
				<Route
					path="/"
					element={<Landing />}
				/>
				<Route
					path="/restaurantmenu"
					element={<RestaurantMenu />}
				/>
			
				<Route
					path="/user/register"
					element={<UserRegister />}
				/>
				<Route
					path="/user/login"
					element={<UserLogin />}
				/>
				<Route
					path="/menu"
					element={<FoodList />}
				/>
				<Route
					path="/food/:id"
					element={<FoodDetail />}
				/>
				<Route
					path="/cart"
					element={<CartPage />}
				/>
				<Route
					path="/MyOrders"
					element={<MyOrders />}
				/>
			</Route>

			{/* Routes without Navbar */}

			{/* Catch-all 404 */}
			<Route
				path="*"
				element={<div className="p-10 text-center text-2xl">404 - Page Not Found</div>}
			/>
		</Routes>
	);
}

export default App;
