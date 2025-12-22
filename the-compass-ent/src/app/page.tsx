"use client";

import { motion } from "framer-motion";
import { RosterGrid } from "@/components/roster-grid";
import { UpcomingEventsSection, PastEventsSection } from "@/components/events-sections";



export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-6 md:px-12 pt-20 z-10">
        <div className="max-w-[1920px] mx-auto w-full">
          <div className="flex flex-col font-oswald font-bold uppercase tracking-tighter leading-[0.85]">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[18vw] md:text-[16vw]"
            >
              The
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[18vw] md:text-[16vw]"
            >
              Compass
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[18vw] md:text-[16vw] text-accent"
            >
              Ent
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 border-l-2 border-accent pl-6 max-w-md"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Based in Korea (South), Seoul <br />
              We select and strive to convey positive sounds.
            </p>
            <p className="text-xs font-mono mt-4 text-muted-foreground">
              EST. 2007 — KOREA/SEOUL
            </p>
          </motion.div>
        </div>
      </section>

      {/* Artist Showcase Section */}
      <RosterGrid />

      {/* Events Section */}
      <section id="events" className="relative py-32 bg-white text-black z-20 px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">
          {/* Upcoming Events */}
          <UpcomingEventsSection />

          {/* Past Events */}
          <PastEventsSection />
        </div>
      </section>

      {/* AI Curator Section */}
      <section id="ai-curator" className="relative py-32 bg-black text-white z-10">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter mb-2">
              AI Curator <span className="text-accent text-2xl align-top">BETA</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-xl">
              Tell us about your event, your mood, or the color of your soul. Our intelligent system will align you with the perfect sonic architect from our roster.
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="e.g., 'Dark warehouse techno for a fashion runway'"
                className="bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-white/20 font-mono"
              />
              <button className="bg-accent text-white px-8 py-4 font-bold uppercase tracking-widest self-start hover:bg-white hover:text-black transition-colors mt-4">
                Find Artist
              </button>
            </div>
          </div>

          <div className="aspect-video bg-[#111] border border-white/10 flex items-center justify-center">
            <span className="font-mono text-white/30 text-sm animate-pulse">[ WAITING FOR INPUT DATA ]</span>
          </div>
        </div>
      </section>
    </div>
  );
}
