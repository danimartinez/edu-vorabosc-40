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

	const handleTicketsClick = (e: React.MouseEvent) => {
		e.preventDefault();
		// Placeholder: currently does not open any external link as requested
	};

	return (
		<div className="relative inline-block text-left w-full max-w-2xl mx-auto">
			<div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
				
				{/* 1st Button: Tickets (Primary Highlight) */}
				<button
					type="button"
					onClick={handleTicketsClick}
					className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-sky-500 text-slate-950 font-extrabold text-sm sm:text-base hover:brightness-105 shadow-md glow-sun transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
				>
					<svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
					</svg>
					<span>Tickets</span>
				</button>

				{/* 2nd Button: Guarda al Calendari (Secondary) */}
				<div className="relative inline-block">
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-xs transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
					>
						<svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<span>Guarda la Data al Calendari</span>
						<svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{/* Calendar Dropdown Menu */}
					{isOpen && (
						<>
							<div
								className="fixed inset-0 z-40"
								onClick={() => setIsOpen(false)}
							/>
							<div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
								<div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
									Tria el teu calendari
								</div>

								<a
									href={getGoogleCalendarUrl()}
									target="_blank"
									rel="noopener noreferrer"
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors"
								>
									<span className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">G</span>
									<span>Google Calendar</span>
								</a>

								<button
									type="button"
									onClick={downloadIcsFile}
									className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors text-left cursor-pointer"
								>
									<span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs">iCal</span>
									<div>
										<div>Apple Calendar / Outlook</div>
										<div className="text-[11px] text-slate-500">Descàrrega fitxer .ics</div>
									</div>
								</button>
							</div>
						</>
					)}
				</div>

			</div>
		</div>
	);
}
