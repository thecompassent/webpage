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

// Course Data
const djCourses = [
    {
        id: "beginner",
        name: "Beginner",
        slug: "beginner",
        description: "DJing Fundamentals",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=1000&fit=crop",
    },
    {
        id: "intermediate",
        name: "Intermediate",
        slug: "intermediate",
        description: "Advanced Mixing Techniques",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop",
    },
    {
        id: "advanced",
        name: "Advanced",
        slug: "advanced",
        description: "Professional Performance & Career",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1000&fit=crop",
    },
];

const producingCourses = [
    {
        id: "midi-basics",
        name: "MIDI Basics",
        slug: "midi-basics",
        description: "Introduction to Digital Audio Workstations",
        image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=1000&fit=crop",
    },
    {
        id: "midi-intermediate",
        name: "MIDI Intermediate",
        slug: "midi-intermediate",
        description: "Sound Design & Arrangement",
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&h=1000&fit=crop",
    },
    {
        id: "ai-basics",
        name: "AI Producing Basics",
        slug: "ai-basics",
        description: "AI Tools for Music Creation",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=1000&fit=crop",
    },
    {
        id: "ai-intermediate",
        name: "AI Producing Intermediate",
        slug: "ai-intermediate",
        description: "Advanced AI Workflows",
        image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=800&h=1000&fit=crop",
    },
];

export default function AcademyPage() {
    const tutors = artists.filter(artist => ["soul", "roha", "siro", "lant"].includes(artist.id));

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 md:px-12 bg-background text-foreground overflow-x-hidden">
            <div className="max-w-[1920px] mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12vw] leading-[0.8] font-oswald font-bold uppercase tracking-tighter mb-24 text-left"
                >
                    Academy
                </motion.h1>

                {/* Curriculum (DJing) */}
                <div className="mb-32">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                        DJ Courses
                    </h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col border-t border-foreground mt-8"
                    >
                        {djCourses.map((course) => (
                            <motion.div key={course.id} variants={item} className="group border-b border-foreground relative">
                                <Link href="#" className="block relative w-full py-8 md:py-12 px-2 overflow-hidden">

                                    {/* Background Image - Reveals on Hover */}
                                    <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-out overflow-hidden z-0 bg-black">
                                        <Image
                                            src={course.image}
                                            alt={course.name}
                                            fill
                                            className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                                    </div>

                                    {/* Course Info */}
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 pl-4 md:pl-8 transition-all duration-500">
                                        <h3 className="text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter text-foreground group-hover:text-white transition-colors whitespace-nowrap">
                                            {course.name}
                                        </h3>
                                        <span className="text-sm md:text-base font-mono uppercase tracking-widest text-muted-foreground group-hover:text-white/80 transition-colors whitespace-nowrap">
                                            {course.description}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Producing / MIDI / AI Producing */}
                <div className="mb-32">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                        Producing / MIDI / AI Producing
                    </h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col border-t border-foreground/30 mt-8"
                    >
                        {producingCourses.map((course) => (
                            <motion.div key={course.id} variants={item} className="group border-b border-foreground/30 relative">
                                <Link href="#" className="block relative w-full py-8 md:py-12 px-2 overflow-hidden">

                                    {/* Background Image - Reveals on Hover */}
                                    <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-out overflow-hidden z-0 bg-black">
                                        <Image
                                            src={course.image}
                                            alt={course.name}
                                            fill
                                            className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                                    </div>

                                    {/* Course Info */}
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 pl-4 md:pl-8 transition-all duration-500">
                                        <h3 className="text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter text-foreground group-hover:text-white transition-colors whitespace-nowrap">
                                            {course.name}
                                        </h3>
                                        <span className="text-sm md:text-base font-mono uppercase tracking-widest text-muted-foreground group-hover:text-white/80 transition-colors whitespace-nowrap">
                                            {course.description}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Tutors */}
                <div>
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                        Tutors
                    </h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col border-t border-foreground mt-8"
                    >
                        {tutors.map((tutor) => (
                            <motion.div key={tutor.id} variants={item} className="group border-b border-foreground relative">
                                <Link href={`/artists/${tutor.slug}`} className="block relative w-full py-8 md:py-12 px-2 overflow-hidden">

                                    {/* Background Image - Reveals on Hover */}
                                    <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-out overflow-hidden z-0 bg-black">
                                        <Image
                                            src={tutor.image}
                                            alt={tutor.name}
                                            fill
                                            className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                                            style={{ objectPosition: tutor.listObjectPosition || tutor.objectPosition || 'center center' }}
                                        />
                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                                    </div>

                                    {/* Tutor Info */}
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 pl-4 md:pl-8 transition-all duration-500">
                                        <h3 className="text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter text-foreground group-hover:text-white transition-colors whitespace-nowrap">
                                            {tutor.name}
                                        </h3>
                                        <span className="text-sm md:text-base font-mono uppercase tracking-widest text-muted-foreground group-hover:text-white/80 transition-colors whitespace-nowrap">
                                            {tutor.role}
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
