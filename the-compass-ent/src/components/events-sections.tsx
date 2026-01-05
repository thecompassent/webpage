"use client";

import { events } from "@/lib/data";
import GoogleDriveImage from "@/components/GoogleDriveImage";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function UpcomingEventsSection() {
    const [viewMode, setViewMode] = useState<"text" | "posters">("text");
    const router = useRouter();

    // Filter upcoming events (date >= today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = events
        .filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (upcomingEvents.length === 0) {
        return null;
    }

    const formatDate = (dateString: string) => {
        return dateString.replace(/-/g, '.');
    };

    // Artist name to slug mapping
    const artistNameToSlug: Record<string, string> = {
        "DJ Lua": "lua",
        "Lua": "lua",
        "DJ Kara": "kara",
        "Kara": "kara",
        "DJ Heejae": "heejae",
        "Heejae": "heejae",
        "DJ AngCherry": "angcherry",
        "AngCherry": "angcherry",
        "Liha": "liha",
        "DJ Kyuria": "kyuria",
        "Kyuria": "kyuria",
        "DJ Don": "don",
        "Don": "don",
        "Eunwoo": "eunwoo",
        "DJ Wenzi": "wenzi",
        "Wenzi": "wenzi",
        "Toxic B": "toxicb",
        "DJ Toxic B": "toxicb",
        "U.na": "una",
        "DJ U.na": "una",
        "DJ roha": "roha",
        "DJ Roha": "roha",
        "Roha": "roha",
        "DJ Siro": "siro",
        "Siro": "siro",
        "DJ VINOVA": "vinova",
        "VINOVA": "vinova",
        "DJ Riya": "riya",
        "Riya": "riya",
        "DJ Windy": "windy",
        "Windy": "windy",
        "DJ Erry": "erry",
        "Erry": "erry",
        "DJ Bliss": "bliss",
        "Bliss": "bliss",
        "SoUL": "soul",
        "Nicole Chen": "nicolechen",
    };

    // Parse artist names and generate links
    const renderArtistLinks = (artistString: string) => {
        if (!artistString || artistString === "TBA") {
            return <span className="font-bold uppercase text-xs group-hover:text-accent transition-colors text-right whitespace-nowrap">TBA</span>;
        }

        // Split by & or , to handle multiple artists
        const artists = artistString.split(/\s*[&,]\s*/).map(name => name.trim());

        return (
            <span className="font-bold uppercase text-xs text-right">
                {artists.map((artist, idx) => {
                    const slug = artistNameToSlug[artist];
                    if (slug) {
                        return (
                            <React.Fragment key={idx}>
                                <a
                                    href={`/artists/${slug}`}
                                    className="hover:text-accent transition-colors underline decoration-dotted"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/artists/${slug}`);
                                    }}
                                >
                                    {artist}
                                </a>
                                {idx < artists.length - 1 && " & "}
                            </React.Fragment>
                        );
                    }
                    return (
                        <React.Fragment key={idx}>
                            {artist}
                            {idx < artists.length - 1 && " & "}
                        </React.Fragment>
                    );
                })}
            </span>
        );
    };


    const handleEventClick = (slug?: string) => {
        if (slug) {
            router.push(`/events/${slug}`);
        }
    };

    return (
        <div className="mb-24">
            <div className="flex items-end justify-between border-b-4 border-black pb-4 mb-12">
                <h2 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter">
                    Upcoming Events
                </h2>
                <div className="flex gap-2 border-2 border-black rounded-full p-1">
                    <button
                        onClick={() => setViewMode("text")}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${viewMode === "text" ? "bg-black text-white" : "hover:bg-gray-100"
                            }`}
                    >
                        Text
                    </button>
                    <button
                        onClick={() => setViewMode("posters")}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${viewMode === "posters" ? "bg-black text-white" : "hover:bg-gray-100"
                            }`}
                    >
                        Posters
                    </button>
                </div>
            </div>

            {viewMode === "text" ? (
                <div className="flex flex-col space-y-1">
                    {upcomingEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => handleEventClick(event.slug)}
                            className={`grid grid-cols-[90px_240px_160px_1fr] md:grid-cols-[110px_300px_200px_1fr] items-center py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors group px-2 ${event.slug ? 'cursor-pointer' : 'cursor-default'} ${event.gallery && event.gallery.length > 0 ? 'bg-accent/5' : ''}`}
                        >
                            <span className={`font-mono text-sm ${event.gallery && event.gallery.length > 0 ? 'text-accent font-bold' : 'text-accent'}`}>
                                {formatDate(event.date)}
                            </span>
                            <span className={`font-oswald text-lg md:text-xl font-bold uppercase truncate pr-4 ${event.gallery && event.gallery.length > 0 ? 'text-accent' : ''}`}>
                                {event.city} {event.gallery && event.gallery.length > 0 && <span className="text-xs">📷</span>}
                            </span>
                            <span className="font-mono text-gray-400 uppercase text-xs truncate pr-2">
                                {event.venue}
                            </span>
                            {renderArtistLinks(event.artist || "TBA")}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {upcomingEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => handleEventClick(event.slug)}
                            className={`group ${event.slug ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            <div className="relative aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                                {event.poster ? (
                                    <GoogleDriveImage
                                        src={event.poster}
                                        alt={`${event.city} poster`}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                        <span className="font-mono text-gray-500 text-sm">NO POSTER</span>
                                    </div>
                                )}
                                <div className={`absolute bottom-0 left-0 right-0 p-4 text-white ${event.gallery && event.gallery.length > 0 ? 'bg-accent animate-pulse-slow' : 'bg-black/80'}`}>
                                    <div className={`font-mono text-xs mb-1 ${event.gallery && event.gallery.length > 0 ? 'text-white/90' : 'text-accent'}`}>
                                        {formatDate(event.date)} {event.gallery && event.gallery.length > 0 && `• 📷 ${event.gallery.length}`}
                                    </div>
                                    <div className="font-oswald text-2xl font-bold uppercase">
                                        {event.city}
                                    </div>
                                    <div className={`font-mono text-xs mt-1 ${event.gallery && event.gallery.length > 0 ? 'text-white/80' : 'text-gray-300'}`}>
                                        {event.venue} • {event.artist || "TBA"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function PastEventsSection() {
    const [viewMode, setViewMode] = useState<"text" | "posters">("text");
    const [selectedYear, setSelectedYear] = useState<string>("All");
    const [selectedCountry, setSelectedCountry] = useState<string>("All");
    const [selectedVenue, setSelectedVenue] = useState<string>("All");
    const [collapsedYears, setCollapsedYears] = useState<Set<string>>(new Set());
    const router = useRouter();

    // Filter past events (date < today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastEvents = events
        .filter(event => {
            const eventDate = new Date(event.date);
            return eventDate < today;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Extract unique years, countries, and venues
    const uniqueYears = Array.from(new Set(pastEvents.map(event => event.date.split('-')[0]))).sort((a, b) => b.localeCompare(a));
    const uniqueCountries = Array.from(new Set(pastEvents.map(event => {
        // Extract country from city field (format: "City, Country")
        const parts = event.city.split(',');
        return parts.length > 1 ? parts[1].trim() : parts[0].trim();
    }))).sort();
    const uniqueVenues = Array.from(new Set(pastEvents.map(event => event.venue))).sort();

    // Read URL parameters on mount
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const venueParam = params.get('venue');
            if (venueParam) {
                setSelectedVenue(venueParam);
                // Scroll to events section
                setTimeout(() => {
                    const eventsSection = document.getElementById('past-events');
                    if (eventsSection) {
                        eventsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    }, []);

    // Apply filters
    const filteredEvents = pastEvents.filter(event => {
        const yearMatch = selectedYear === "All" || event.date.startsWith(selectedYear);
        const eventCountry = event.city.split(',').length > 1 ? event.city.split(',')[1].trim() : event.city.trim();
        const countryMatch = selectedCountry === "All" || eventCountry === selectedCountry;
        const venueMatch = selectedVenue === "All" || event.venue === selectedVenue;
        return yearMatch && countryMatch && venueMatch;
    });

    if (pastEvents.length === 0) {
        return null;
    }

    const formatDate = (dateString: string) => {
        return dateString.replace(/-/g, '.');
    };

    // Artist name to slug mapping
    const artistNameToSlug: Record<string, string> = {
        "DJ Lua": "lua",
        "Lua": "lua",
        "DJ Kara": "kara",
        "Kara": "kara",
        "DJ Heejae": "heejae",
        "Heejae": "heejae",
        "DJ AngCherry": "angcherry",
        "AngCherry": "angcherry",
        "Liha": "liha",
        "DJ Kyuria": "kyuria",
        "Kyuria": "kyuria",
        "DJ Don": "don",
        "Don": "don",
        "Eunwoo": "eunwoo",
        "DJ Wenzi": "wenzi",
        "Wenzi": "wenzi",
        "Toxic B": "toxicb",
        "DJ Toxic B": "toxicb",
        "U.na": "una",
        "DJ U.na": "una",
        "DJ roha": "roha",
        "DJ Roha": "roha",
        "Roha": "roha",
        "DJ Siro": "siro",
        "Siro": "siro",
        "DJ VINOVA": "vinova",
        "VINOVA": "vinova",
        "DJ Riya": "riya",
        "Riya": "riya",
        "DJ Windy": "windy",
        "Windy": "windy",
        "DJ Erry": "erry",
        "Erry": "erry",
        "DJ Bliss": "bliss",
        "Bliss": "bliss",
        "SoUL": "soul",
        "Nicole Chen": "nicolechen",
    };

    // Parse artist names and generate links
    const renderArtistLinks = (artistString: string) => {
        if (!artistString || artistString === "TBA") {
            return <span className="font-bold uppercase text-xs text-right whitespace-nowrap">TBA</span>;
        }

        // Split by & or , to handle multiple artists
        const artists = artistString.split(/\s*[&,]\s*/).map(name => name.trim());

        return (
            <span className="font-bold uppercase text-xs text-right">
                {artists.map((artist, idx) => {
                    const slug = artistNameToSlug[artist];
                    if (slug) {
                        return (
                            <React.Fragment key={idx}>
                                <a
                                    href={`/artists/${slug}`}
                                    className="hover:text-accent transition-colors underline decoration-dotted"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/artists/${slug}`);
                                    }}
                                >
                                    {artist}
                                </a>
                                {idx < artists.length - 1 && " & "}
                            </React.Fragment>
                        );
                    }
                    return (
                        <React.Fragment key={idx}>
                            {artist}
                            {idx < artists.length - 1 && " & "}
                        </React.Fragment>
                    );
                })}
            </span>
        );
    };

    const handleEventClick = (slug?: string) => {
        if (slug) {
            router.push(`/events/${slug}`);
        }
    };

    // Group filtered events by year
    const eventsByYear: { [year: string]: typeof events } = {};
    filteredEvents.forEach(event => {
        const year = event.date.split('-')[0];
        if (!eventsByYear[year]) {
            eventsByYear[year] = [];
        }
        eventsByYear[year].push(event);
    });

    // Get sorted years from the grouped events
    const sortedYears = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));

    const toggleYear = (year: string) => {
        setCollapsedYears(prev => {
            const newSet = new Set(prev);
            if (newSet.has(year)) {
                newSet.delete(year);
            } else {
                newSet.add(year);
            }
            return newSet;
        });
    };

    return (
        <div id="past-events">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b-4 border-black pb-4 mb-12 gap-4">
                <h2 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter">
                    Past Events
                </h2>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:w-auto">
                    {/* Filters */}
                    <div className="flex gap-2 flex-wrap">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="px-4 py-2 border-2 border-black rounded-full text-sm font-bold uppercase tracking-widest bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <option value="All">All Years</option>
                            {uniqueYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="px-4 py-2 border-2 border-black rounded-full text-sm font-bold uppercase tracking-widest bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <option value="All">All Countries</option>
                            {uniqueCountries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        <select
                            value={selectedVenue}
                            onChange={(e) => setSelectedVenue(e.target.value)}
                            className="px-4 py-2 border-2 border-black rounded-full text-sm font-bold uppercase tracking-widest bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <option value="All">All Venues</option>
                            {uniqueVenues.map(venue => (
                                <option key={venue} value={venue}>{venue}</option>
                            ))}
                        </select>
                    </div>
                    {/* View Mode Toggle */}
                    <div className="flex gap-2 border-2 border-black rounded-full p-1">
                        <button
                            onClick={() => setViewMode("text")}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${viewMode === "text" ? "bg-black text-white" : "hover:bg-gray-100"
                                }`}
                        >
                            Text
                        </button>
                        <button
                            onClick={() => setViewMode("posters")}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${viewMode === "posters" ? "bg-black text-white" : "hover:bg-gray-100"
                                }`}
                        >
                            Posters
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {sortedYears.length > 0 ? (
                    sortedYears.map((year, yearIndex) => {
                        const isCollapsed = collapsedYears.has(year);
                        const yearEvents = eventsByYear[year];

                        return (
                            <div key={year}>
                                <button
                                    onClick={() => toggleYear(year)}
                                    className="w-full flex items-center justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg mb-4 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-oswald font-bold text-accent">{year}</span>
                                        <span className="text-sm text-gray-500 font-mono">
                                            ({yearEvents.length} {yearEvents.length === 1 ? 'event' : 'events'})
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`}
                                    />
                                </button>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isCollapsed ? 0 : 'auto',
                                        opacity: isCollapsed ? 0 : 1
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    {viewMode === "text" ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                                            {yearEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    onClick={() => handleEventClick(event.slug)}
                                                    className={`grid grid-cols-[90px_240px_160px_1fr] md:grid-cols-[110px_300px_200px_1fr] items-center py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors group opacity-60 hover:opacity-100 px-2 ${event.slug ? 'cursor-pointer' : 'cursor-default'} ${event.gallery && event.gallery.length > 0 ? 'bg-accent/5 !opacity-80' : ''}`}
                                                >
                                                    <span className={`font-mono text-sm ${event.gallery && event.gallery.length > 0 ? 'text-accent font-bold' : 'text-gray-400'}`}>
                                                        {formatDate(event.date)}
                                                    </span>
                                                    <span className={`font-oswald text-lg font-bold uppercase truncate pr-4 ${event.gallery && event.gallery.length > 0 ? 'text-accent' : ''}`}>
                                                        {event.city} {event.gallery && event.gallery.length > 0 && <span className="text-xs">📷</span>}
                                                    </span>
                                                    <span className="font-mono text-gray-400 uppercase text-xs truncate pr-2">
                                                        {event.venue}
                                                    </span>
                                                    {renderArtistLinks(event.artist || "TBA")}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                            {yearEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    onClick={() => handleEventClick(event.slug)}
                                                    className={`group opacity-75 hover:opacity-100 transition-opacity ${event.slug ? 'cursor-pointer' : 'cursor-default'}`}
                                                >
                                                    <div className="relative aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                                                        {event.poster ? (
                                                            <GoogleDriveImage
                                                                src={event.poster}
                                                                alt={`${event.city} poster`}
                                                                fill
                                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                                                <span className="font-mono text-gray-500 text-sm">NO POSTER</span>
                                                            </div>
                                                        )}
                                                        <div className={`absolute bottom-0 left-0 right-0 p-4 text-white ${event.gallery && event.gallery.length > 0 ? 'bg-accent animate-pulse-slow' : 'bg-black/80'}`}>
                                                            <div className={`font-mono text-xs mb-1 ${event.gallery && event.gallery.length > 0 ? 'text-white/90' : 'text-gray-400'}`}>
                                                                {formatDate(event.date)} {event.gallery && event.gallery.length > 0 && `• 📷 ${event.gallery.length}`}
                                                            </div>
                                                            <div className="font-oswald text-2xl font-bold uppercase">
                                                                {event.city}
                                                            </div>
                                                            <div className={`font-mono text-xs mt-1 ${event.gallery && event.gallery.length > 0 ? 'text-white/80' : 'text-gray-300'}`}>
                                                                {event.venue} • {event.artist || "TBA"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>

                                {yearIndex < sortedYears.length - 1 && (
                                    <div className="my-8 border-t border-gray-200"></div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 text-gray-500 font-mono">
                        No events found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
}
