import React, { useState, useEffect } from 'react';

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isPast: boolean;
}

export default function Countdown({ targetDate = '2027-06-19T13:00:00+02:00' }: { targetDate?: string }) {
	const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

	useEffect(() => {
		const target = new Date(targetDate).getTime();

		const calculateTime = () => {
			const now = new Date().getTime();
			const difference = target - now;

			if (difference <= 0) {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
				return;
			}

			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft({ days, hours, minutes, seconds, isPast: false });
		};

		calculateTime();
		const timer = setInterval(calculateTime, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	if (!timeLeft) {
		return (
			<div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto animate-pulse">
				{[...Array(4)].map((_, i) => (
					<div key={i} className="h-20 sm:h-24 bg-slate-100 rounded-2xl border border-slate-200" />
				))}
			</div>
		);
	}

	if (timeLeft.isPast) {
		return (
			<div className="text-center py-6 px-8 rounded-2xl bg-amber-50 border border-amber-300 max-w-lg mx-auto shadow-xs">
				<p className="text-2xl sm:text-3xl text-amber-900 font-heading tracking-wide">🎉 És avui! Gaudeix del Vörabosc 4.0! 🎉</p>
			</div>
		);
	}

	const units = [
		{ label: 'Dies', value: timeLeft.days },
		{ label: 'Hores', value: String(timeLeft.hours).padStart(2, '0') },
		{ label: 'Minuts', value: String(timeLeft.minutes).padStart(2, '0') },
		{ label: 'Segons', value: String(timeLeft.seconds).padStart(2, '0') },
	];

	return (
		<div className="w-full max-w-xl mx-auto px-2">
			<div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
				{units.map((unit, idx) => (
					<div
						key={idx}
						className="glass-card rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-sky-400 hover:shadow-md transition-all duration-300"
					>
						<div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-sky-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
						
						<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-slate-900 tracking-wide leading-none">
							{unit.value}
						</span>
						
						<span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 mt-1 sm:mt-2">
							{unit.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
