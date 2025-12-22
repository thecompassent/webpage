"use client";

import { motion } from "framer-motion";
import { RosterGrid } from "@/components/roster-grid";



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
              Based in Seoul & Amsterdam.<br />
              We curate the frequency of the underground.
            </p>
            <p className="text-xs font-mono mt-4 text-muted-foreground">
              EST. 2024 — SEOUL/AMS
            </p>
          </motion.div>
        </div>
      </section>

      {/* Artist Showcase Section */}
      <RosterGrid />

      {/* AI Curator Section */}

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

      {/* Tour Dates Section */}
      <section id="events" className="relative py-32 bg-white text-black z-20 px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-end justify-between border-b-4 border-black pb-4 mb-12">
            <h2 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter">
              Tour Dates
            </h2>
            <span className="font-mono text-sm mb-2 hidden md:block">[ SEASON 2024/25 ]</span>
          </div>

          <div className="flex flex-col">
            {[
              { date: "2024.11.24", city: "SEOUL", venue: "FAUST", artist: "VØID WALKER" },
              { date: "2024.12.02", city: "AMSTERDAM", venue: "SHELTER", artist: "LUMINA" },
              { date: "2024.12.15", city: "TOKYO", venue: "VENT", artist: "K-ROGUE" },
              { date: "2024.12.31", city: "BERLIN", venue: "BERGHAIN", artist: "VØID WALKER" },
            ].map((event, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 py-8 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors group cursor-pointer">
                <span className="font-mono text-accent text-sm md:text-base mb-2 md:mb-0">{event.date}</span>
                <span className="font-oswald text-3xl md:text-4xl font-bold uppercase">{event.city}</span>
                <span className="font-mono text-gray-400 uppercase text-sm md:text-base">{event.venue}</span>
                <span className="font-bold uppercase text-right md:text-left group-hover:text-accent transition-colors">{event.artist}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button className="border-2 border-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors text-sm">
              View All Archives
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
