"use client";

import { artists } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ArtistsPage() {
    const compassArtists = artists.filter(a => a.category === "compass" && !a.hidden);
    const partnershipArtists = artists.filter(a => a.category === "partnership" && !a.hidden);

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 md:px-12 bg-background text-foreground overflow-x-hidden">
            <div className="max-w-[1920px] mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12vw] leading-[0.8] font-oswald font-bold uppercase tracking-tighter mb-24 text-left"
                >
                    Our<br />Artists
                </motion.h1>

                {/* The Compass Ent Artists */}
                <div className="mb-32">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                        The Compass Ent Artists
                    </h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 border-t border-foreground mt-8"
                    >
                        {compassArtists.map((artist) => (
                            <motion.div key={artist.id} variants={item} className="group border-b border-foreground relative">
                                <Link href={`/artists/${artist.slug}`} className="block relative w-full py-8 md:py-12 px-2 overflow-hidden">

                                    {/* Background Image - Reveals on Hover */}
                                    <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-out overflow-hidden z-0 bg-black">
                                        <Image
                                            src={artist.image}
                                            alt={artist.name}
                                            fill
                                            className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                                            style={{ objectPosition: artist.listObjectPosition || artist.objectPosition || 'center' }}
                                        />
                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                                    </div>

                                    {/* Artist Info */}
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 pl-4 md:pl-8 transition-all duration-500">
                                        <h3 className="text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter text-foreground group-hover:text-white transition-colors whitespace-nowrap">
                                            {artist.name}
                                        </h3>
                                        <span className="text-sm md:text-base font-mono uppercase tracking-widest text-muted-foreground group-hover:text-white/80 transition-colors whitespace-nowrap">
                                            {artist.role}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Partnership Agency Artists */}
                <div className="mb-32">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-muted-foreground border-b-2 border-muted-foreground pb-2 inline-block">
                        Partnership Companies & Agency Artists
                    </h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 border-t border-foreground/30 mt-8"
                    >
                        {partnershipArtists.map((artist) => (
                            <motion.div key={artist.id} variants={item} className="group border-b border-foreground/30 relative">
                                <Link href={`/artists/${artist.slug}`} className="block relative w-full py-8 md:py-12 px-2 overflow-hidden">

                                    {/* Background Image - Reveals on Hover */}
                                    <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-out overflow-hidden z-0 bg-black">
                                        <Image
                                            src={artist.image}
                                            alt={artist.name}
                                            fill
                                            className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                                            style={{ objectPosition: artist.listObjectPosition || artist.objectPosition || 'center' }}
                                        />
                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                                    </div>

                                    {/* Artist Info */}
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 pl-4 md:pl-8 transition-all duration-500">
                                        <h3 className="text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter text-foreground group-hover:text-white transition-colors whitespace-nowrap">
                                            {artist.name}
                                        </h3>
                                        <span className="text-sm md:text-base font-mono uppercase tracking-widest text-muted-foreground group-hover:text-white/80 transition-colors whitespace-nowrap">
                                            {artist.role}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>


            </div>
        </div>
    );
}
