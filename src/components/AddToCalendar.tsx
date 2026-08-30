import React, { useState } from 'react';

interface Props {
	title?: string;
	description?: string;
	location?: string;
	startDate?: string; // ISO
	endDate?: string;   // ISO
}

export default function AddToCalendar({
	title = "Vörabosc 4.0 - 40 Anys d'Edu",
	description = "Celebració del 40è aniversari d'Edu a La Pèrgola (Carpes Vig Estiu). Vermut, arrossos, pastís, música en directe i foodtrucks!",
	location = "La Pèrgola, Carpes Vig Estiu, Vic, Barcelona",
	startDate = "2027-06-19T13:00:00+02:00",
	endDate = "2027-06-20T00:00:00+02:00"
}: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	// Google Calendar URL generator
	const getGoogleCalendarUrl = () => {
		const start = new Date(startDate).toISOString().replace(/-|:|\.\d+/g, '');
		const end = new Date(endDate).toISOString().replace(/-|:|\.\d+/g, '');
		const params = new URLSearchParams({
			action: 'TEMPLATE',
			text: title,
			dates: `${start}/${end}`,
			details: description,
			location: location,
		});
		return `https://calendar.google.com/calendar/render?${params.toString()}`;
	};

	// ICS file generator and downloader
	const downloadIcsFile = () => {
		const formatIcsDate = (isoStr: string) => {
			return new Date(isoStr).toISOString().replace(/-|:|\.\d+/g, '');
		};

		const icsContent = [
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'PRODID:-//Vorabosc//Vorabosc 4.0//CA',
			'CALSCALE:GREGORIAN',
			'BEGIN:VEVENT',
			`SUMMARY:${title}`,
			`DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
			`LOCATION:${location}`,
			`DTSTART:${formatIcsDate(startDate)}`,
			`DTEND:${formatIcsDate(endDate)}`,
			'STATUS:CONFIRMED',
			'END:VEVENT',
			'END:VCALENDAR'
		].join('\r\n');

		const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'vorabosc-4.0.ics');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
		setIsOpen(false);
	};

	const copyShareLink = async () => {
		const text = `🎉 Vörabosc 4.0 — 40è Aniversari d'Edu!\n📅 19 de Juny 2027 (13:00 - 00:00)\n📍 La Pèrgola (Carpes Vig Estiu, Vic)\n\nGuarda la data: ${window.location.href}`;
		try {
			if (navigator.share) {
				await navigator.share({
					title: "Vörabosc 4.0",
					text: text,
					url: window.location.href,
				});
			} else {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setTimeout(() => setCopied(false), 2500);
			}
		} catch (err) {
			console.log("Share skipped or unsupported", err);
		}
	};

	return (
		<div className="relative inline-block text-left">
			<div className="flex flex-wrap items-center justify-center gap-3">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 text-slate-950 font-bold text-sm sm:text-base hover:brightness-110 shadow-lg glow-box-orange transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
				>
					<svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span>Guarda la Data al Calendari</span>
					<svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				<button
					type="button"
					onClick={copyShareLink}
					className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/15 transition-all cursor-pointer backdrop-blur-md"
				>
					<svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
					</svg>
					<span>{copied ? 'Enllaç Copiat! ✨' : 'Compartir'}</span>
				</button>
			</div>

			{/* Calendar Dropdown Menu */}
			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-40"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 mt-3 w-72 rounded-2xl glass-card border border-white/15 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
						<div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/10 mb-1">
							Tria el teu calendari
						</div>

						<a
							href={getGoogleCalendarUrl()}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => setIsOpen(false)}
							className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white text-sm font-medium transition-colors"
						>
							<span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">G</span>
							<span>Google Calendar</span>
						</a>

						<button
							type="button"
							onClick={downloadIcsFile}
							className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white text-sm font-medium transition-colors text-left cursor-pointer"
						>
							<span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">iCal</span>
							<div>
								<div>Apple Calendar / Outlook</div>
								<div className="text-[11px] text-slate-400">Descàrrega fitxer .ics</div>
							</div>
						</button>
					</div>
				</>
			)}
		</div>
	);
}
