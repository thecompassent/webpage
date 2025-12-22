"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-16 text-center"
                >
                    About <span className="text-accent">Us</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-12 text-lg md:text-xl leading-relaxed text-muted-foreground"
                >
                    <p>
                        <span className="text-foreground font-bold">The Compass Ent</span> is more than just a label; it is a movement.
                        Founded in the heart of the underground scene, we have grown into a global force, representing the most
                        innovative and boundary-pushing artists in electronic music.
                    </p>

                    <div className="relative aspect-video w-full overflow-hidden bg-secondary my-12">
                        <Image
                            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
                            alt="Crowd at a festival"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    <h2 className="text-3xl font-bold uppercase tracking-tighter text-foreground">Our Philosophy</h2>
                    <p>
                        We believe in the power of sound to connect people. Our mission is to curate experiences that transcend
                        the ordinary, bringing together diverse cultures and sounds under one roof. We are committed to
                        nurturing talent and providing a platform for artistic expression without compromise.
                    </p>

                    <h2 className="text-3xl font-bold uppercase tracking-tighter text-foreground">Global Reach</h2>
                    <p>
                        From intimate club nights in Seoul to massive festivals in Europe, The Compass Ent artists are
                        making waves across the globe. We work tirelessly to ensure our artists' visions are realized
                        on the world stage.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
