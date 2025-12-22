export function Footer() {
    return (
        <footer className="relative bg-black text-white border-t-4 border-accent pt-16 pb-8 px-6 md:px-12 z-20">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">

                {/* Column 1: Brand */}
                <div className="md:col-span-2">
                    <h2 className="text-4xl font-oswald font-bold uppercase tracking-tighter mb-6">
                        The Compass Ent.
                    </h2>
                    <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                        Navigating the intersection of sound, fashion, and technology.
                        We represent the new vanguard of electronic music artists.
                    </p>
                    <a href="mailto:soulnation@gmail.com" className="inline-block mt-8 text-lg font-bold border-b border-white hover:text-accent hover:border-accent transition-colors">
                        soulnation@gmail.com
                    </a>
                    <p className="mt-4 text-gray-400 text-sm">
                        WhatsApp: +82 010 2876 3394<br />
                        WeChat: spaceknkn<br />
                        LINE: soulnation
                    </p>
                </div>

                {/* Column 2: Headquarters */}
                <div>
                    <h3 className="text-accent text-xs font-bold uppercase tracking-widest mb-6">Headquarters</h3>
                    <div className="mb-8">
                        <h4 className="font-bold uppercase mb-1">Seoul</h4>
                        <p className="text-gray-400 text-xs">Gangnam-gu, Sinsa dong 511-10, B2<br />Seoul, Korea (South) 06035</p>
                    </div>
                </div>

                {/* Column 3: Social */}
                <div>
                    <h3 className="text-accent text-xs font-bold uppercase tracking-widest mb-6">Social</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <a href="https://www.instagram.com/thecompassent" target="_blank" rel="noopener noreferrer" className="font-bold uppercase hover:text-accent transition-colors">
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@thecompassent" target="_blank" rel="noopener noreferrer" className="font-bold uppercase hover:text-accent transition-colors">
                                YouTube
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 text-[10px] text-gray-500 font-mono uppercase">
                <p>© 2024 The Compass Entertainment. All rights reserved.</p>
                <p>Designed with Gemini Intelligence.</p>
            </div>
        </footer>
    );
}
