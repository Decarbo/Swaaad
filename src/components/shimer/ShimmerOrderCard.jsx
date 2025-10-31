import React from 'react';
import { motion } from 'framer-motion';

const ShimmerOrderCard = () => {
	return (
		<div className="pt-22">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-gray-800 max-w-4xl mx-auto flex-row  space-y-1 p-6 rounded-2xl shadow-lg border border-gray-700 animate-pulse">
				{/* Customer Header */}

				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gray-700 rounded-full" />
						<div>
							<div className="h-5 w-32 bg-gray-700 rounded mb-1" />
							<div className="h-4 w-40 bg-gray-700 rounded" />
						</div>
					</div>
					<div className="h-6 w-16 bg-gray-700 rounded-full" />
				</div>

				{/* Special Note */}
				<div className="h-4 w-48 bg-gray-700 rounded mb-4" />

				{/* Items */}
				<div className="space-y-3">
					{[1, 2].map((i) => (
						<div
							key={i}
							className="flex items-center gap-4">
							<div className="w-16 h-16 bg-gray-700 rounded-xl" />
							<div className="flex-1 space-y-2">
								<div className="h-5 w-36 bg-gray-700 rounded" />
								<div className="h-4 w-24 bg-gray-700 rounded" />
							</div>
						</div>
					))}
				</div>

				{/* Total */}
				<div className="mt-4 h-6 w-32 bg-gray-700 rounded" />

				{/* Action Buttons */}
				<div className="mt-4 flex gap-2">
					<div className="h-10 w-28 bg-gray-700 rounded-xl" />
					<div className="h-10 w-20 bg-gray-700 rounded-xl" />
				</div>
			</motion.div>
		</div>
	);
};

export default ShimmerOrderCard;
