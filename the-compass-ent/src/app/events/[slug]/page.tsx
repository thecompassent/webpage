"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getCompanyEvents } from "@/lib/utils/event-helpers";
import { use } from "react";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const companyEvents = getCompanyEvents();
    const event = companyEvents.find((e) => e.slug === slug);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    if (!event || !event.images) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 md:px-12 bg-background text-foreground">
                <div className="max-w-[1920px] mx-auto">
                    <h1 className="text-5xl font-oswald font-bold uppercase">Event Not Found</h1>
                    <p className="text-muted-foreground mt-4">
                        Looking for slug: {slug}
                    </p>
                    <Link href="/company" className="text-accent hover:underline mt-4 inline-block">
                        Back to Company
                    </Link>
                </div>
            </div>
        );
    }

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
    };

    const navigate = (direction: "prev" | "next") => {
        if (selectedImageIndex === null || !event.images) return;

        let newIndex = direction === "prev" ? selectedImageIndex - 1 : selectedImageIndex + 1;

        if (newIndex < 0) newIndex = event.images.length - 1;
        if (newIndex >= event.images.length) newIndex = 0;

        setSelectedImageIndex(newIndex);
    };

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 md:px-12 bg-background text-foreground">
            <div className="max-w-[1920px] mx-auto">
                <Link
                    href="/company"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-widest mb-8 hover:text-accent transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Events
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter mb-4">
                        {event.title}
                    </h1>
                    <p className="text-xl text-muted-foreground font-mono">
                        {event.date}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {event.images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative aspect-square cursor-pointer overflow-hidden bg-black"
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={image}
                                alt={`${event.title} - Photo ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedImageIndex !== null && event.images && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12"
                            onClick={closeLightbox}
                        >
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-50"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50"
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); navigate("next"); }}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50"
                            >
                                <ChevronRight className="w-10 h-10" />
                            </button>

                            <div
                                className="relative w-full max-w-[1800px] h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={event.images[selectedImageIndex]}
                                    alt={`${event.title} - Photo ${selectedImageIndex + 1}`}
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                />
                                <div className="absolute -bottom-12 left-0 text-white">
                                    <p className="font-mono text-sm text-white/60">
                                        {selectedImageIndex + 1} / {event.images.length}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
