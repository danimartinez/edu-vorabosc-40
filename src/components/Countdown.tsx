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
			<div className="grid grid-cols-4 gap-3 max-w-lg mx-auto animate-pulse">
				{[...Array(4)].map((_, i) => (
					<div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/10" />
				))}
			</div>
		);
	}

	if (timeLeft.isPast) {
		return (
			<div className="text-center py-6 px-8 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-orange-500/30">
				<p className="text-2xl font-bold text-amber-300 font-heading">🎉 És avui! Gaudeix del Vörabosc 4.0! 🎉</p>
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
		<div className="w-full max-w-xl mx-auto">
			<div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
				{units.map((unit, idx) => (
					<div
						key={idx}
						className="glass-card rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-orange-500/40 transition-colors"
					>
						<div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
						<span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
							{unit.value}
						</span>
						<span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-orange-400/90 mt-1 sm:mt-2">
							{unit.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
