"use client";

import { artists, events, Event } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Video, Image as ImageIcon, ArrowLeft, Instagram, Youtube, Music, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

// Extended Event type for display purposes
type DisplayEvent = Event & { source: 'compass' | 'local' };

interface ArtistDetailClientProps {
    slug: string;
}

export default function ArtistDetailClient({ slug }: ArtistDetailClientProps) {
    const artist = artists.find((a) => a.slug === slug);
    const [eventView, setEventView] = useState<"text" | "image">("text");
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [selectedEventImageIndex, setSelectedEventImageIndex] = useState<number | null>(null);
    const [collapsedYears, setCollapsedYears] = useState<Set<string>>(new Set());
    // Local event gallery lightbox state
    const [selectedLocalGallery, setSelectedLocalGallery] = useState<string[] | null>(null);
    const [selectedLocalGalleryIndex, setSelectedLocalGalleryIndex] = useState<number>(0);

    if (!artist) {
        notFound();
    }

    const handlePrevImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (selectedImageIndex !== null && artist.profileImages && selectedImageIndex < artist.profileImages.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const handlePrevEventImage = () => {
        if (selectedEventImageIndex !== null && selectedEventImageIndex > 0) {
            setSelectedEventImageIndex(selectedEventImageIndex - 1);
        }
    };

    const handleNextEventImage = () => {
        if (selectedEventImageIndex !== null && artist.eventImages && selectedEventImageIndex < artist.eventImages.length - 1) {
            setSelectedEventImageIndex(selectedEventImageIndex + 1);
        }
    };

    // Local event gallery handlers
    const handleLocalGalleryClick = (gallery: string[]) => {
        setSelectedLocalGallery(gallery);
        setSelectedLocalGalleryIndex(0);
    };

    const handlePrevLocalGallery = () => {
        if (selectedLocalGalleryIndex > 0) {
            setSelectedLocalGalleryIndex(selectedLocalGalleryIndex - 1);
        }
    };

    const handleNextLocalGallery = () => {
        if (selectedLocalGallery && selectedLocalGalleryIndex < selectedLocalGallery.length - 1) {
            setSelectedLocalGalleryIndex(selectedLocalGalleryIndex + 1);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header / Profile Section */}
            <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover grayscale"
                    style={{ objectPosition: artist.objectPosition || 'center 35%' }}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-[1920px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link href="/artists" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest mb-6 hover:text-accent transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Artists
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-4 text-foreground font-oswald">
                            {artist.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-accent uppercase tracking-widest mb-8 font-mono">
                            {artist.role}
                        </p>

                        <div className="flex gap-4">
                            {artist.socials.instagram && (
                                <a href={artist.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-3 border border-foreground/20 hover:border-accent hover:text-accent transition-colors rounded-full">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {artist.socials.youtube && (
                                <a href={artist.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-3 border border-foreground/20 hover:border-accent hover:text-accent transition-colors rounded-full">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            )}
                            {artist.socials.soundcloud && (
                                <a href={artist.socials.soundcloud} target="_blank" rel="noopener noreferrer" className="p-3 border border-foreground/20 hover:border-accent hover:text-accent transition-colors rounded-full">
                                    <Music className="w-5 h-5" />
                                </a>
                            )}
                            {artist.socials.spotify && (
                                <a href={artist.socials.spotify} target="_blank" rel="noopener noreferrer" className="p-3 border border-foreground/20 hover:border-[#1DB954] hover:text-[#1DB954] transition-colors rounded-full">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1920px] mx-auto px-6 py-12 space-y-16">

                {/* Biography */}
                <section className="border-t border-b border-foreground py-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-accent">Biography</h2>
                    <p className="text-xl md:text-2xl leading-relaxed text-foreground max-w-full font-serif whitespace-pre-line">
                        {artist.bio}
                    </p>
                </section>

                {/* Profile Photos */}
                {artist.profileImages && artist.profileImages.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-4 font-oswald">
                            <ImageIcon className="w-8 h-8 text-accent" /> Profile Photos
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {artist.profileImages.map((photo, index) => {
                                const imagePath = typeof photo === 'string' ? photo : photo.path;
                                const imagePosition = typeof photo === 'string' ? 'center center' : (photo.position || 'center center');
                                return (
                                    <div
                                        key={index}
                                        className="relative aspect-square bg-secondary overflow-hidden group cursor-pointer"
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <Image
                                            src={imagePath}
                                            alt={`${artist.name} profile ${index + 1}`}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                            style={{ objectPosition: imagePosition }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Event Photos */}
                {artist.eventImages && artist.eventImages.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-4 font-oswald">
                            <ImageIcon className="w-8 h-8 text-accent" /> Event Photos
                        </h2>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                            {artist.eventImages.map((photo, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square bg-secondary overflow-hidden group cursor-pointer"
                                    onClick={() => setSelectedEventImageIndex(index)}
                                >
                                    <Image
                                        src={photo}
                                        alt={`Event photo ${index + 1}`}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Video Clips */}
                {artist.videos && artist.videos.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-4 font-oswald">
                            <Video className="w-8 h-8 text-accent" /> Video Clips
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {artist.videos.map((video) => (
                                <button
                                    key={video.id}
                                    onClick={() => setSelectedVideo(video.url)}
                                    className="group cursor-pointer block text-left w-full"
                                >
                                    <div className="relative aspect-video bg-black overflow-hidden mb-4">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                            <div className="w-16 h-16 rounded-full bg-accent/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold uppercase tracking-wide group-hover:text-accent transition-colors">
                                        {video.title}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Event History */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-4 font-oswald">
                            <Calendar className="w-8 h-8 text-accent" /> Event History
                        </h2>
                        <div className="flex gap-2 border border-foreground rounded-full p-1">
                            <button
                                onClick={() => setEventView("text")}
                                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${eventView === "text" ? "bg-accent text-white" : "hover:bg-secondary"
                                    }`}
                            >
                                Text
                            </button>
                            <button
                                onClick={() => setEventView("image")}
                                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${eventView === "image" ? "bg-accent text-white" : "hover:bg-secondary"
                                    }`}
                            >
                                Posters
                            </button>
                        </div>
                    </div>

                    {(() => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        // Filter events for this artist
                        const globalEvents = events.filter(event =>
                            event.artist && event.artist.toLowerCase().includes(artist.name.toLowerCase())
                        );

                        const localEvents = artist.localEvents || [];

                        // Merge and map to DisplayEvent
                        const allEvents: DisplayEvent[] = [
                            ...globalEvents.map(e => ({ ...e, source: 'compass' as const })),
                            ...localEvents.map(e => ({ ...e, source: 'local' as const }))
                        ];

                        const upcomingEvents = allEvents
                            .filter(event => new Date(event.date) >= today)
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                        const pastEvents = allEvents
                            .filter(event => new Date(event.date) < today)
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                        // Helper for badges
                        const SourceBadge = ({ source }: { source: 'compass' | 'local' }) => (
                            <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded border ml-2 align-middle ${source === 'compass'
                                ? 'border-accent text-accent'
                                : 'border-muted-foreground text-muted-foreground'
                                }`}>
                                {source === 'compass' ? 'Compass Events' : 'Artist'}
                            </span>
                        );

                        const renderEventList = (eventList: DisplayEvent[], title: string) => {
                            if (eventList.length === 0) return null;
                            return (
                                <div className="mb-12">
                                    <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-accent border-b border-accent/50 pb-2 inline-block">
                                        {title}
                                    </h3>
                                    {eventView === "text" ? (
                                        <div className="space-y-1">
                                            {eventList.map((event) => (
                                                <Link
                                                    href={event.slug ? `/events/${event.slug}` : "#"}
                                                    key={event.id}
                                                    className={`grid grid-cols-[100px_1fr_1fr] md:grid-cols-[120px_1fr_1fr] items-center py-3 border-b border-foreground/10 hover:bg-secondary/30 transition-colors px-2 group ${!event.slug && !event.gallery ? 'cursor-default pointer-events-none' : 'cursor-pointer'} ${event.gallery && event.gallery.length > 0 ? 'bg-accent/5' : ''}`}
                                                    onClick={(e) => {
                                                        if (event.gallery && event.gallery.length > 0) {
                                                            e.preventDefault();
                                                            handleLocalGalleryClick(event.gallery);
                                                        }
                                                    }}
                                                >
                                                    <span className={`font-mono text-sm ${event.gallery && event.gallery.length > 0 ? 'text-accent font-bold' : 'text-accent'}`}>{event.date}</span>
                                                    <div className="flex items-center overflow-hidden pr-4">
                                                        <span className={`text-lg md:text-xl font-oswald font-bold uppercase group-hover:text-accent transition-colors truncate ${event.gallery && event.gallery.length > 0 ? 'text-accent' : ''}`}>
                                                            {event.city}
                                                        </span>
                                                        <SourceBadge source={event.source} />
                                                        {event.gallery && event.gallery.length > 0 && <span className="text-xs ml-2">📷</span>}
                                                    </div>
                                                    <span className="text-muted-foreground font-mono uppercase text-xs text-right truncate">{event.venue}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                            {eventList.map((event) => (
                                                <Link
                                                    href={event.slug ? `/events/${event.slug}` : "#"}
                                                    key={event.id}
                                                    className={`group ${!event.slug && !event.gallery ? 'cursor-default pointer-events-none' : 'cursor-pointer'}`}
                                                    onClick={(e) => {
                                                        if (event.gallery && event.gallery.length > 0) {
                                                            e.preventDefault();
                                                            handleLocalGalleryClick(event.gallery);
                                                        }
                                                    }}
                                                >
                                                    <div className="relative aspect-[3/4] bg-secondary mb-4 overflow-hidden">
                                                        {event.poster ? (
                                                            <Image
                                                                src={event.poster}
                                                                alt={`${event.city} poster`}
                                                                fill
                                                                className={`object-cover transition-all duration-500 group-hover:scale-105 ${event.gallery && event.gallery.length > 0 ? 'grayscale-0 animate-pulse-slow' : 'grayscale group-hover:grayscale-0'}`}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground font-mono text-sm">
                                                                NO POSTER
                                                            </div>
                                                        )}
                                                        {/* Badge Overlay for Poster View */}
                                                        <div className="absolute top-2 right-2">
                                                            <span className={`text-[10px] font-bold px-2 py-1 rounded shadow-sm ${event.source === 'compass'
                                                                ? 'bg-accent text-white'
                                                                : 'bg-black/70 text-white border border-white/20'
                                                                }`}>
                                                                {event.source === 'compass' ? 'Compass Events' : 'Artist'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className={`text-xl font-bold uppercase tracking-wide group-hover:text-accent transition-colors ${event.gallery && event.gallery.length > 0 ? 'text-accent' : ''}`}>
                                                                {event.city} {event.gallery && event.gallery.length > 0 && <span className="text-sm">📷</span>}
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground">{event.venue}</p>
                                                        </div>
                                                        <span className="text-sm font-mono border border-border px-2 py-1 rounded-full">{event.date}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        };

                        const renderPastEventsByYear = (pastEventsList: DisplayEvent[]) => {
                            if (pastEventsList.length === 0) return null;

                            // Group events by year
                            const eventsByYear: { [year: string]: DisplayEvent[] } = {};
                            pastEventsList.forEach(event => {
                                const year = event.date.split('-')[0];
                                if (!eventsByYear[year]) {
                                    eventsByYear[year] = [];
                                }
                                eventsByYear[year].push(event);
                            });

                            const years = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));

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
                                <div className="mb-12">
                                    <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-accent border-b border-accent/50 pb-2 inline-block">
                                        Past Events
                                    </h3>
                                    <div className="space-y-8">
                                        {years.map((year, yearIndex) => {
                                            const isCollapsed = collapsedYears.has(year);
                                            const yearEvents = eventsByYear[year];

                                            return (
                                                <div key={year}>
                                                    <button
                                                        onClick={() => toggleYear(year)}
                                                        className="w-full flex items-center justify-between py-3 px-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-lg mb-4 group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-2xl font-oswald font-bold text-accent">{year}</span>
                                                            <span className="text-sm text-muted-foreground font-mono">
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
                                                        {eventView === "text" ? (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                                                {yearEvents.map((event) => (
                                                                    <Link
                                                                        href={event.slug ? `/events/${event.slug}` : "#"}
                                                                        key={event.id}
                                                                        className={`grid grid-cols-[100px_1fr_1fr] md:grid-cols-[120px_1fr_1fr] items-center py-3 border-b border-foreground/10 hover:bg-secondary/30 transition-colors px-2 group ${!event.slug && !event.gallery ? 'cursor-default pointer-events-none' : 'cursor-pointer'} ${event.gallery && event.gallery.length > 0 ? 'bg-accent/5' : ''}`}
                                                                        onClick={(e) => {
                                                                            if (event.gallery && event.gallery.length > 0) {
                                                                                e.preventDefault();
                                                                                handleLocalGalleryClick(event.gallery);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <span className={`font-mono text-sm ${event.gallery && event.gallery.length > 0 ? 'text-accent font-bold' : 'text-accent'}`}>{event.date}</span>
                                                                        <div className="flex items-center overflow-hidden pr-4">
                                                                            <span className={`text-lg md:text-xl font-oswald font-bold uppercase group-hover:text-accent transition-colors truncate ${event.gallery && event.gallery.length > 0 ? 'text-accent' : ''}`}>
                                                                                {event.city}
                                                                            </span>
                                                                            <SourceBadge source={event.source} />
                                                                            {event.gallery && event.gallery.length > 0 && <span className="text-xs ml-2">📷</span>}
                                                                        </div>
                                                                        <span className="text-muted-foreground font-mono uppercase text-xs text-right truncate">{event.venue}</span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                                                {yearEvents.map((event) => (
                                                                    <Link
                                                                        href={event.slug ? `/events/${event.slug}` : "#"}
                                                                        key={event.id}
                                                                        className={`group ${!event.slug && !event.gallery ? 'cursor-default pointer-events-none' : 'cursor-pointer'}`}
                                                                        onClick={(e) => {
                                                                            if (event.gallery && event.gallery.length > 0) {
                                                                                e.preventDefault();
                                                                                handleLocalGalleryClick(event.gallery);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <div className="relative aspect-[3/4] bg-secondary mb-4 overflow-hidden">
                                                                            {event.poster ? (
                                                                                <Image
                                                                                    src={event.poster}
                                                                                    alt={`${event.city} poster`}
                                                                                    fill
                                                                                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${event.gallery && event.gallery.length > 0 ? 'grayscale-0 animate-pulse-slow' : 'grayscale group-hover:grayscale-0'}`}
                                                                                />
                                                                            ) : (
                                                                                <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground font-mono text-sm">
                                                                                    NO POSTER
                                                                                </div>
                                                                            )}
                                                                            {/* Badge Overlay for Poster View */}
                                                                            <div className="absolute top-2 right-2">
                                                                                <span className={`text-[10px] font-bold px-2 py-1 rounded shadow-sm ${event.source === 'compass'
                                                                                    ? 'bg-accent text-white'
                                                                                    : 'bg-black/70 text-white border border-white/20'
                                                                                    }`}>
                                                                                    {event.source === 'compass' ? 'Compass Events' : 'Artist'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <h3 className={`text-xl font-bold uppercase tracking-wide group-hover:text-accent transition-colors ${event.gallery && event.gallery.length > 0 ? 'text-accent' : ''}`}>
                                                                                    {event.city} {event.gallery && event.gallery.length > 0 && <span className="text-sm">📷</span>}
                                                                                </h3>
                                                                                <p className="text-sm text-muted-foreground">{event.venue}</p>
                                                                            </div>
                                                                            <span className="text-sm font-mono border border-border px-2 py-1 rounded-full">{event.date}</span>
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </motion.div>

                                                    {yearIndex < years.length - 1 && (
                                                        <div className="my-8 border-t border-accent/20"></div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        };

                        if (upcomingEvents.length === 0 && pastEvents.length === 0) {
                            return <p className="text-muted-foreground font-mono">No events found for this artist.</p>;
                        }

                        return (
                            <>
                                {renderEventList(upcomingEvents, "Upcoming Events")}
                                {renderPastEventsByYear(pastEvents)}
                            </>
                        );
                    })()}
                </section>

            </div >

            {/* Video Modal */}
            {
                selectedVideo && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <div
                            className="relative w-full max-w-[90vw] aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors text-sm uppercase tracking-widest"
                            >
                                Close ✕
                            </button>
                            <iframe
                                src={selectedVideo.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/')}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )
            }

            {/* Profile Image Lightbox Modal */}
            {
                selectedImageIndex !== null && artist.profileImages && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <div
                            className="relative max-w-7xl max-h-[90vh] w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImageIndex(null)}
                                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors text-sm uppercase tracking-widest z-10"
                            >
                                Close ✕
                            </button>

                            {/* Previous Button */}
                            {selectedImageIndex > 0 && (
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            )}

                            {/* Next Button */}
                            {selectedImageIndex < artist.profileImages.length - 1 && (
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            )}

                            <div className="relative w-full h-full">
                                <Image
                                    src={typeof artist.profileImages[selectedImageIndex] === 'string'
                                        ? artist.profileImages[selectedImageIndex]
                                        : artist.profileImages[selectedImageIndex].path}
                                    alt="Profile photo"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-mono">
                                {selectedImageIndex + 1} / {artist.profileImages.length}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Event Image Lightbox Modal */}
            {
                selectedEventImageIndex !== null && artist.eventImages && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedEventImageIndex(null)}
                    >
                        <div
                            className="relative max-w-7xl max-h-[90vh] w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedEventImageIndex(null)}
                                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors text-sm uppercase tracking-widest z-10"
                            >
                                Close ✕
                            </button>

                            {/* Previous Button */}
                            {selectedEventImageIndex > 0 && (
                                <button
                                    onClick={handlePrevEventImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            )}

                            {/* Next Button */}
                            {selectedEventImageIndex < artist.eventImages.length - 1 && (
                                <button
                                    onClick={handleNextEventImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            )}

                            <div className="relative w-full h-full">
                                <Image
                                    src={artist.eventImages[selectedEventImageIndex]}
                                    alt="Event photo"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-mono">
                                {selectedEventImageIndex + 1} / {artist.eventImages.length}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Local Event Gallery Lightbox Modal */}
            {
                selectedLocalGallery && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedLocalGallery(null)}
                    >
                        <div
                            className="relative max-w-7xl max-h-[90vh] w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedLocalGallery(null)}
                                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors text-sm uppercase tracking-widest z-10"
                            >
                                Close ✕
                            </button>

                            {/* Previous Button */}
                            {selectedLocalGalleryIndex > 0 && (
                                <button
                                    onClick={handlePrevLocalGallery}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            )}

                            {/* Next Button */}
                            {selectedLocalGalleryIndex < selectedLocalGallery.length - 1 && (
                                <button
                                    onClick={handleNextLocalGallery}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            )}

                            <div className="relative w-full h-full">
                                <Image
                                    src={selectedLocalGallery[selectedLocalGalleryIndex]}
                                    alt="Event gallery photo"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-mono">
                                {selectedLocalGalleryIndex + 1} / {selectedLocalGallery.length}
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
