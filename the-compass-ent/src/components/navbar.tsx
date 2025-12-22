"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Company", href: "/company" },
    { name: "Artists", href: "/artists" },
    { name: "Events", href: "/#events" },
    { name: "Academy", href: "/academy" },
    { name: "AI Curator", href: "/#ai-curator" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent pt-6 px-6 md:px-12 pointer-events-none">
            <div className="max-w-[1920px] mx-auto flex items-start justify-between pointer-events-auto">
                <Link href="/" className="flex items-start gap-1">
                    <span className="text-3xl md:text-4xl font-bold tracking-tighter uppercase font-oswald text-black leading-none">
                        THE COMPASS
                    </span>
                    <span className="text-accent text-xs md:text-sm font-bold font-oswald leading-none mt-0">
                        ENT.
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-12 pt-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors font-mono",
                                pathname === item.href ? "text-accent" : "text-black"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-black"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-0 right-0 bg-white border-b border-black md:hidden shadow-xl pointer-events-auto"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-lg font-bold uppercase tracking-widest hover:text-accent transition-colors font-oswald",
                                        pathname === item.href ? "text-accent" : "text-black"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
