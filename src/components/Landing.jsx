import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
	{
		url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80',
		text: 'Where every bite tells a story',
	},
	{
		url: 'https://wallpapers.com/images/hd/food-4k-3gsi5u6kjma5zkj0.jpg',
		text: 'Delicious moments, freshly served',
	},
	{
		url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80',
		text: 'Taste that lingers longer',
	},
	{
		url: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1600&q=80',
		text: 'A feast for your senses',
	},
	{
		url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
		text: 'Fresh. Flavorful. Fabulous.',
	},
];

export default function LandingNoFlash() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setCurrent((c) => (c + 1) % images.length);
		}, 5000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="relative w-full h-screen overflow-hidden bg-black">
			{/* Dark Base Layer – Prevents White Flash */}
			<div className="absolute inset-0 bg-black" />

			{/* Images Container */}
			<div className="absolute inset-0">
				<AnimatePresence mode="wait">
					<motion.div
						key={current}
						className="absolute inset-0"
						initial={{ opacity: 0, scale: 1.12 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.98 }}
						transition={{
							opacity: { duration: 1.2 },
							scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
						}}>
						<img
							src={images[current].url}
							alt={images[current].text}
							className="w-full h-full object-cover"
							loading="lazy"
						/>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

			{/* Content */}
			<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
				<h1
					className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 font1
          bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FFB900]
          ">
					Swaaad
				</h1>

				<motion.p
					key={current}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: 'easeOut' }}
					className="text-xl md:text-3xl font2 font-light tracking-wide text-[#F5F5F5] max-w-3xl leading-relaxed drop-shadow-md">
					{images[current].text}
				</motion.p>

				<div className="mt-8">
					<button className="group relative overflow-hidden bg-[#FFB900] text-[#323130] font-semibold px-8 py-3 rounded-full hover:bg-[#ffcd3c] transition-all duration-300 shadow-lg">
						<span className="relative z-10">View Menu</span>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
					</button>
				</div>
			</div>

			{/* Progress Dots */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-10">
				{images.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrent(i)}
						className="relative h-1 w-8 rounded-full overflow-hidden bg-white/30">
						<motion.div
							className="absolute inset-0 bg-[#FFB900]"
							initial={{ x: '-100%' }}
							animate={{ x: i === current ? '0%' : '-100%' }}
							transition={{ duration: 5, ease: 'linear' }}
						/>
					</button>
				))}
			</div>
		</div>
	);
}
