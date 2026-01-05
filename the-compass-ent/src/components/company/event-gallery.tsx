"use client";

import { motion } from "framer-motion";
import CloudinaryImage from "@/components/CloudinaryImage";
import Link from "next/link";
import { Play } from "lucide-react";
import { CompanyEvent } from "@/lib/data";

interface EventGalleryProps {
    events: CompanyEvent[];
    title?: string;
    id?: string;
}

export function EventGallery({ events, title = "Past Events", id = "events-gallery" }: EventGalleryProps) {
    return (
        <section className="py-24" id={id}>
            <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-12 text-accent border-b-2 border-accent pb-2 inline-block">
                {title}
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-0">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={event.slug ? `/events/${event.slug}` : "#"}
                        className="block"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`group relative aspect-square cursor-pointer overflow-hidden bg-black ${event.images && event.images.length > 0 ? 'ring-2 ring-accent ring-inset' : ''}`}
                        >
                            <CloudinaryImage
                                src={event.type === "video" ? (event.thumbnail || event.src) : event.src}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                            {event.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play className="w-5 h-5 text-white fill-white" />
                                    </div>
                                </div>
                            )}

                            {event.images && event.images.length > 0 && (
                                <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                                    📷 {event.images.length}
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-white font-oswald font-bold uppercase tracking-wider text-lg">
                                    {event.title}
                                </h3>
                                <p className="text-white/70 font-mono text-xs">
                                    {event.date}
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
