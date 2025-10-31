import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function BookingModal({ onClose, onConfirm }) {
	const [form, setForm] = useState({
		name: '',
		phone: '',
		specialInstructions: '',
		payNow: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.name || !form.phone) {
			alert('Please fill all required fields');
			return;
		}
		onConfirm(form); // pass payNow boolean to parent
		console.log(form);
	};

	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className="bg-gray-900 text-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
				<h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Book a Table</h2>

				<form
					onSubmit={handleSubmit}
					className="space-y-4">
					{/* Full Name */}
					<div>
						<label className="block text-gray-300 mb-1">Full Name</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="Enter your name"
							className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-400 outline-none"
						/>
					</div>

					{/* Phone Number */}
					<div>
						<label className="block text-gray-300 mb-1">Phone Number</label>
						<input
							type="text"
							name="phone"
							value={form.phone}
							onChange={handleChange}
							placeholder="Enter your phone number"
							className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-400 outline-none"
						/>
					</div>

					{/* Special Instructions */}
					<div>
						<label className="block text-gray-300 mb-1">Special Instructions</label>
						<textarea
							name="specialInstructions"
							value={form.specialInstructions}
							onChange={handleChange}
							placeholder="E.g. Need 4 chairs near window"
							className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-400 outline-none"></textarea>
					</div>

					{/* Pay Now Option */}
					<div className="flex items-center gap-3 mt-3 bg-gray-800 p-3 rounded-xl border border-gray-700">
						<input
							type="checkbox"
							name="payNow"
							checked={form.payNow}
							onChange={handleChange}
							id="payNow"
							className="w-5 h-5 text-yellow-400 focus:ring-yellow-400 rounded-md"
						/>
						<label
							htmlFor="payNow"
							className="flex items-center gap-2 cursor-pointer select-none">
							<CheckCircle2
								size={18}
								className={form.payNow ? 'text-yellow-400' : 'text-gray-500'}
							/>
							<span className="text-gray-300">
								Want your meal fast? <span className="text-yellow-400 font-semibold">Pay now!</span>
							</span>
						</label>
					</div>

					{/* Buttons */}
					<div className="flex justify-end gap-3 mt-6">
						<button
							type="button"
							onClick={onClose}
							className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600">
							Cancel
						</button>
						<button
							type="submit"
							className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-500">
							{form.payNow ? 'Pay & Confirm' : 'Confirm Booking'}
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
}
