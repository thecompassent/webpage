"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import GoogleDriveImage from "@/components/GoogleDriveImage";
import { ArrowRight } from "lucide-react";
import { artists, Artist } from "@/lib/data";

export function RosterGrid() {
    const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);

    // Get first 16 artists
    const showcaseArtists = artists.slice(0, 16);

    return (
        <section
            className="relative py-24 bg-white z-20 px-6 md:px-12"
            onMouseLeave={() => setHoveredArtist(null)}
        >
            <div className="max-w-[1920px] mx-auto">
                <div className="flex items-end justify-between border-b-2 border-black pb-4 mb-16">
                    <h2 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter">
                        {hoveredArtist ? hoveredArtist.name : "Our Artists"}
                    </h2>
                    <Link href="/artists" className="group flex items-center gap-2 font-mono text-sm uppercase tracking-widest hover:text-accent transition-colors hidden md:flex">
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-4 md:grid-cols-8 gap-0 min-h-[50vw] md:min-h-[25vw]">
                    {showcaseArtists.map((artist) => (
                        <Link
                            key={artist.id}
                            href={`/artists/${artist.slug}`}
                            className="group relative aspect-square overflow-hidden bg-black block"
                            onMouseEnter={() => setHoveredArtist(artist)}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-full"
                            >
                                <GoogleDriveImage
                                    src={artist.image}
                                    alt={artist.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                    style={{ objectPosition: artist.homeObjectPosition || artist.objectPosition || 'center' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-oswald font-bold text-xs md:text-sm uppercase tracking-tighter leading-tight">
                                        {artist.name}
                                    </h3>
                                    <p className="text-white/70 font-mono text-[8px] md:text-[10px] uppercase tracking-widest">
                                        {artist.role}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="flex justify-center mt-12 md:hidden">
                    <Link href="/artists" className="border-2 border-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors text-sm inline-flex items-center gap-2">
                        View All Artists
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
