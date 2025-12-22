"use client";

import { motion } from "framer-motion";
import { EventGallery } from "@/components/company/event-gallery";
import { events, overseasTourVenues } from "@/lib/data";
import { getCompanyEvents } from "@/lib/utils/event-helpers";

export default function CompanyPage() {
    const currentYear = new Date().getFullYear();
    const startYear = Math.min(...events.map(e => parseInt(e.date.split('-')[0])));

    // Calculate unique countries
    const countries = new Set<string>();
    events.forEach(event => {
        const parts = event.city.split(',');
        const country = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        countries.add(country);
    });

    // Calculate total shows (artists count)
    let totalShows = 0;
    events.forEach(event => {
        if (event.artist) {
            // Split by comma or ampersand
            const artists = event.artist.split(/[,&]/).map(a => a.trim()).filter(a => a);
            totalShows += artists.length;
        }
    });
    return (
        <div className="min-h-screen pt-32 pb-12 px-4 md:px-12 bg-background text-foreground overflow-x-hidden">
            <div className="max-w-[1920px] mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12vw] leading-[0.8] font-oswald font-bold uppercase tracking-tighter mb-24 text-left"
                >
                    Company
                </motion.h1>

                {/* Company Information */}
                <section className="mb-32">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                        Company Information
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-col justify-center space-y-6">
                            <h3 className="text-4xl font-oswald font-bold uppercase">The Compass Ent.</h3>
                            <p className="text-xl text-muted-foreground font-mono">
                                EST. 2007<br />
                                Seoul, South Korea
                            </p>
                            <div className="space-y-2 text-muted-foreground">
                                <p><strong>Registration No:</strong> 2022-000107</p>
                                <p><strong>CEO:</strong> Ihl Han Shin ( SoUL )</p>
                                <p><strong>Address:</strong> Gangnam-gu, Seoul, South Korea</p>
                                <p><strong>Business:</strong> Music Production, Artist Management, Event Planning</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Gig History */}
                <section className="mb-32">
                    {/* Gig History */}
                    <section className="mb-32">
                        <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                            {startYear}-{currentYear} Gig History
                        </h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="text-left">
                                <h3 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter text-foreground">
                                    {countries.size} Countries
                                </h3>
                                <h3 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter text-accent">
                                    + {totalShows} Shows
                                </h3>
                            </div>
                        </motion.div>
                    </section>
                </section>

                {/* Global Tour */}
                <section className="mb-32">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                        {startYear}-{currentYear} Overseas DJ Tour
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 font-mono">
                        {(() => {
                            // Group venues by country from events data
                            const venuesByCountry: Record<string, Set<string>> = {};

                            events.forEach((event: any) => {
                                // Extract country from city field (format: "City, Country")
                                const parts = event.city.split(',');
                                const country = parts.length > 1 ? parts[1].trim() : parts[0].trim();

                                // Skip Korea (domestic events)
                                if (country === 'Korea' || country === 'South Korea') return;

                                if (!venuesByCountry[country]) {
                                    venuesByCountry[country] = new Set();
                                }
                                venuesByCountry[country].add(event.venue);
                            });

                            // Merge with manual entries
                            overseasTourVenues.forEach((entry: any) => {
                                if (!venuesByCountry[entry.country]) {
                                    venuesByCountry[entry.country] = new Set();
                                }
                                // Add manual venues to the set
                                entry.venues.split(',').forEach((venue: string) => {
                                    venuesByCountry[entry.country].add(venue.trim());
                                });
                            });

                            // Convert to array and sort by country name
                            const countriesData = Object.entries(venuesByCountry)
                                .map(([country, venues]) => ({
                                    country,
                                    venues: Array.from(venues).sort().join(', ')
                                }))
                                .sort((a, b) => a.country.localeCompare(b.country));

                            // Venue name mapping for linking
                            const venueMapping: Record<string, string> = {
                                "Omni Nightclub": "Omni Nightclub",
                                "Alta Nightclub": "Alta Nightclub",
                                "Ai Nightclub": "Ai Nightclub",
                                "18tc": "18tc",
                                "Zentral": "Zentral",
                                "Sound Department": "Sound Department",
                                "Zeus": "Zeus",
                                "Club Reach": "Club Reach",
                                "W": "W",
                                "Mota": "Mota",
                                "Hollywood": "Hollywood",
                                "Lucifer": "Lucifer",
                                "Paraclub": "Paraclub",
                                "Aqua Partyclub": "Aqua Partyclub",
                                "PioneerPlus": "PioneerPlus",
                                "Asgard": "Asgard",
                                "Hatyai Midnight": "Hatyai Midnight",
                                "Udon Songkran": "Udon Songkran",
                                "Central Hatyai": "Central Hatyai",
                                "Starfield Aquafield": "Starfield Aquafield",
                                "Banyantree": "Banyantree",
                                "Shinhwa World": "Shinhwa World",
                                "Nabi": "Nabi",
                                "Coex Kpop Square": "Coex Kpop Square",
                                "Lyn Skylounge": "Lyn Skylounge",
                                "Flexyum": "Flexyum",
                            };

                            // Parse venues string into clickable links
                            const renderVenues = (venuesStr: string) => {
                                const parts = venuesStr.split(',').map(v => v.trim());
                                return parts.map((venue, idx) => {
                                    const mappedVenue = venueMapping[venue] || venue;
                                    if (venueMapping[venue]) {
                                        return (
                                            <span key={idx}>
                                                <a
                                                    href={`/?venue=${encodeURIComponent(mappedVenue)}#past-events`}
                                                    className="hover:text-accent transition-colors underline decoration-dotted"
                                                >
                                                    {venue}
                                                </a>
                                                {idx < parts.length - 1 && ', '}
                                            </span>
                                        );
                                    }
                                    return (
                                        <span key={idx}>
                                            {venue}
                                            {idx < parts.length - 1 && ', '}
                                        </span>
                                    );
                                });
                            };

                            return countriesData.map((item, index) => (
                                <div key={index} className="border-l-2 border-accent pl-4">
                                    <h4 className="text-xl font-bold uppercase text-accent mb-1">{item.country}</h4>
                                    <p className="text-muted-foreground text-sm md:text-base">
                                        {renderVenues(item.venues)}
                                    </p>
                                </div>
                            ));
                        })()}
                    </motion.div>
                </section>

                {/* Clients & Partners */}
                <section className="mb-32">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                        Clients & Partners
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl"
                    >
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-oswald font-bold uppercase mb-4">Clients</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Kukje Gallery, Samsung Electronics, Hyundai Motors, Baccarat, Paradise Hotel, Banyan Tree,
                                    LVMH, Chanel, MCM, Pernod-Ricard, Rapha, Volcom, BAT (British American Tobacco), Hite Jinro, Etc
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-oswald font-bold uppercase mb-4">Partners</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Kukje Gallery, Pequod Acoustics, Nouhaus, SM Ent, Etc
                                </p>
                            </div>
                            <div className="pt-8 border-t border-foreground/20">
                                <p className="font-mono text-sm text-muted-foreground">SINCE 2007</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Events Gallery */}
                {(() => {
                    // Get all company events using helper function
                    const companyEvents = getCompanyEvents();

                    const parseDate = (dateStr: string) => {
                        // Format: "YYYY.MM.DD - City, Country"
                        const datePart = dateStr.split(' - ')[0];
                        return new Date(datePart.replace(/\./g, '-'));
                    };

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const upcomingEvents = companyEvents
                        .filter(event => {
                            const date = parseDate(event.date);
                            return date >= today;
                        })
                        .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

                    const pastEvents = companyEvents
                        .filter(event => {
                            const date = parseDate(event.date);
                            return date < today;
                        })
                        .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

                    return (
                        <>
                            {upcomingEvents.length > 0 && (
                                <EventGallery events={upcomingEvents} title="Upcoming Events" id="upcoming-events" />
                            )}
                            <EventGallery events={pastEvents} title="Past Events" id="past-events" />
                        </>
                    );
                })()}
            </div>
        </div>
    );
}
