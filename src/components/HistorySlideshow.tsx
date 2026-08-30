import React, { useState, useEffect } from 'react';

const historyImages = [
	'/images/history/vorabosc-history-1.jpg',
	'/images/history/vorabosc-history-2.jpg',
	'/images/history/vorabosc-history-3.jpg',
	'/images/history/vorabosc-history-4.jpg',
];

export default function HistorySlideshow() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev === historyImages.length - 1 ? 0 : prev + 1));
		}, 3500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative group w-full max-w-xl mx-auto">
			{/* Subtle ambient glow */}
			<div className="absolute -inset-1 bg-gradient-to-r from-amber-300 via-amber-400 to-sky-300 rounded-3xl blur-md opacity-35 group-hover:opacity-60 transition duration-500 pointer-events-none" />

			{/* Main Image Container */}
			<div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xl aspect-[16/10] sm:aspect-[4/3] w-full">
				{historyImages.map((src, idx) => (
					<div
						key={idx}
						className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
							idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
						}`}
					>
						<img
							src={src}
							alt="Vörabosc Moments Històrics"
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
