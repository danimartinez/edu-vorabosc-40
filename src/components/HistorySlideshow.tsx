import React, { useState, useEffect, useCallback } from 'react';

const historyImages = [
	{
		src: '/images/history/vorabosc-history-1.jpg',
		title: 'Piscina & Amics',
		caption: 'Moments inoblidables de les primeres edicions',
	},
	{
		src: '/images/history/vorabosc-history-2.jpg',
		title: 'La Taula & Barrets de Palla',
		caption: 'Tradició, sobretaules i festa a l’aire lliure',
	},
	{
		src: '/images/history/vorabosc-history-3.jpg',
		title: 'Confeti & Celebració',
		caption: 'L’autèntic esperit festiu del Vörabosc',
	},
	{
		src: '/images/history/vorabosc-history-4.jpg',
		title: 'Festa a l’Aigua',
		caption: 'Banyades, música i rialles sense parar',
	},
];

export default function HistorySlideshow() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlay, setIsAutoPlay] = useState(true);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev === historyImages.length - 1 ? 0 : prev + 1));
	}, []);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev === 0 ? historyImages.length - 1 : prev - 1));
	}, []);

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
		setIsAutoPlay(false);
	};

	useEffect(() => {
		if (!isAutoPlay) return;
		const interval = setInterval(nextSlide, 4000);
		return () => clearInterval(interval);
	}, [isAutoPlay, nextSlide]);

	return (
		<div
			className="relative group w-full max-w-xl mx-auto"
			onMouseEnter={() => setIsAutoPlay(false)}
			onMouseLeave={() => setIsAutoPlay(true)}
		>
			{/* Gradient glow frame */}
			<div className="absolute -inset-1 bg-gradient-to-r from-amber-300 via-amber-400 to-sky-300 rounded-3xl blur-md opacity-35 group-hover:opacity-60 transition duration-500 pointer-events-none" />

			{/* Main Slide Container */}
			<div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl">
				
				{/* Image Viewport */}
				<div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-900">
					{historyImages.map((image, idx) => (
						<div
							key={idx}
							className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
								idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
							}`}
						>
							<img
								src={image.src}
								alt={image.title}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
							
							{/* Bottom Slide Info Overlay */}
							<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white z-20">
								<h4 className="text-base sm:text-lg font-black font-heading text-white drop-shadow-md">
									{image.title}
								</h4>
								<p className="text-xs text-slate-200 font-medium drop-shadow-sm">
									{image.caption}
								</p>
							</div>
						</div>
					))}

					{/* Navigation Prev Button */}
					<button
						type="button"
						onClick={prevSlide}
						aria-label="Imatge anterior"
						className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
					>
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					{/* Navigation Next Button */}
					<button
						type="button"
						onClick={nextSlide}
						aria-label="Imatge següent"
						className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
					>
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
						</svg>
					</button>

					{/* Image Counter Pill */}
					<div className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white shadow-xs">
						{currentIndex + 1} / {historyImages.length}
					</div>
				</div>

				{/* Dot Indicators */}
				<div className="py-3 px-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2">
					{historyImages.map((_, idx) => (
						<button
							key={idx}
							type="button"
							onClick={() => goToSlide(idx)}
							aria-label={`Ves a la diapositiva ${idx + 1}`}
							className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
								idx === currentIndex
									? 'w-6 bg-gradient-to-r from-amber-400 to-sky-500'
									: 'w-2 bg-slate-300 hover:bg-slate-400'
							}`}
						/>
					))}
				</div>

			</div>
		</div>
	);
}
