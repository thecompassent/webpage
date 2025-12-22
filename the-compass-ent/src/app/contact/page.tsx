"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
                        Get in <span className="text-accent">Touch</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-12">
                        For booking inquiries, demos, or general questions, please reach out to us.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 mt-1 flex items-center justify-center">
                                <span className="text-accent font-bold text-xl">@</span>
                            </div>
                            <div>
                                <h3 className="font-bold uppercase tracking-widest mb-1">General Director</h3>
                                <p className="text-lg font-bold">신일한 (SoUL)</p>
                                <p className="text-muted-foreground">+82 010 2876 3394</p>
                                <p className="text-muted-foreground">soulnation@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-accent mt-1" />
                            <div>
                                <h3 className="font-bold uppercase tracking-widest mb-1">Messengers</h3>
                                <div className="grid grid-cols-1 gap-1 text-muted-foreground">
                                    <p><span className="text-foreground font-bold text-xs uppercase w-20 inline-block">Whatsapp</span> +82 010 2876 3394</p>
                                    <p><span className="text-foreground font-bold text-xs uppercase w-20 inline-block">Wechat</span> spaceknkn</p>
                                    <p><span className="text-foreground font-bold text-xs uppercase w-20 inline-block">Line/Kakao</span> soulnation</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-accent mt-1" />
                            <div>
                                <h3 className="font-bold uppercase tracking-widest mb-1">Office</h3>
                                <p className="text-muted-foreground">
                                    Seoul, South Korea<br />
                                    Amsterdam, Netherlands
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-secondary p-8 md:p-12"
                >
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-8">Send a Message</h2>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-background border border-border p-3 focus:outline-none focus:border-accent transition-colors"
                                placeholder="YOUR NAME"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-background border border-border p-3 focus:outline-none focus:border-accent transition-colors"
                                placeholder="YOUR@EMAIL.COM"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest mb-2">Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                className="w-full bg-background border border-border p-3 focus:outline-none focus:border-accent transition-colors"
                                placeholder="YOUR MESSAGE..."
                            />
                        </div>
                        <button className="w-full bg-foreground text-background font-bold uppercase tracking-widest py-4 hover:bg-accent hover:text-accent-foreground transition-colors">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
