export interface Artist {
    id: string;
    name: string;
    slug: string;
    role: string;
    image: string;
    bio: string;
    socials: {
        instagram?: string;
        soundcloud?: string;
        youtube?: string;
    };
    category: "compass" | "partnership";
    // Detailed Content
    profileImages?: string[]; // Array of image paths
    eventImages?: string[];   // Array of image paths
    videos?: {
        id: string;
        title: string;
        thumbnail: string;
        url: string;
    }[];
    gigHistory?: {
        date: string;
        venue: string;
        city: string;
        poster?: string;
    }[];
}

export interface Event {
    id: string;
    date: string;
    venue: string;
    city: string;
    poster: string;
}

export interface Release {
    id: string;
    title: string;
    year: string;
    cover: string;
    link: string;
}

// The Compass Ent Artists
export const artists: Artist[] = [
    // The Compass Ent Artists
    {
        id: "soul",
        name: "SoUL",
        slug: "soul",
        role: "Founder / DJ",
        image: "/images/artists/soul/main.jpg",
        bio: `SoUL is a DJ and label owner with over 20 years of experience in various fields including club director, festival planning, operation, event promotion, and marketing in Korea. SoUL published the very first DJing & Party Planning Book in Korea and there is no doubt saying that he is a pioneer of 'Korea EDM Scene' which runs projects that He produced and taught Djing to many Korea's celebrities like 남규리(Nam Gyu Ri),유건(Yu Gun),and 심은진(Shim Eun Jin), 조한선(Cho Han Sun), 이완(Ewan), 유건(Yugun)
        SoUL pursues not only sets of sound limited and stuck in one genre, but he seeks Advanced Electronic Music that is based on a variety of genre with analog sound such as disco, funky. Spin of SoUL flown over from his finger tips has the 'soul', the 'drama' with strong dynamic impression like Korea that he had lived in.
        Currently, he has launched a label called ‘The Compass Ent’ targeting the newly growing dance music scene along with Kpop. From 2022 to 2023, over 150 events with over + 10 DJs from Kpop idols were successfully held in Asia and elsewhere.
        SoUL in charge of directing the monthly Kpop Event held at Omni & Alta in Taiwan, and Kpop DJ Events in Macau, China, Thailand, Malaysia, etc. are in progress with partners.`,
        socials: {
            instagram: "https://instagram.com/mixbysoul",
            soundcloud: "https://soundcloud.com/mixbysoul",
        },
        category: "compass",
        profileImages: [
            "/images/artists/soul/main.jpg",
            "/images/artists/soul/001.jpg",
            "/images/artists/soul/002.jpg",
            "/images/artists/soul/003.jpg",
        ],
        eventImages: [
            "/images/artists/soul/001.jpg",
            "/images/artists/soul/002.jpg",
            "/images/artists/soul/003.jpg",
        ],
        videos: [
            { id: "v1", title: "SoUL @ Whiterabbit", thumbnail: "https://img.youtube.com/vi/p44lRtxp9Js/maxresdefault.jpg", url: "https://youtu.be/p44lRtxp9Js" },
            { id: "v2", title: "SoUL @ Tan Beach", thumbnail: "https://img.youtube.com/vi/hjwZu4zB9jg/hqdefault.jpg", url: "https://youtu.be/hjwZu4zB9jg" },
        ],
        gigHistory: [
            { date: "2023.05.06", venue: "Whiterabbit", city: "Indonesia, Jakarta", poster: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=800&fit=crop" },
            { date: "2022.07.23", venue: "Tan Beach", city: "Korea, Yangyang", poster: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=800&fit=crop" },
        ],
    },
    {
        id: "lua",
        name: "DJ Lua",
        slug: "lua",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop",
        bio: "Bringing ethereal soundscapes and deep house grooves to the dancefloor.",
        socials: {
            instagram: "https://instagram.com/djlua",
            soundcloud: "https://soundcloud.com/djlua",
        },
        category: "compass",
    },
    {
        id: "kara",
        name: "DJ Kara",
        slug: "kara",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1000&fit=crop",
        bio: "High-energy techno and acid sets that ignite the underground.",
        socials: {
            instagram: "https://instagram.com/djkara",
            soundcloud: "https://soundcloud.com/djkara",
        },
        category: "compass",
    },
    {
        id: "heejae",
        name: "DJ Heejae",
        slug: "heejae",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=1000&fit=crop",
        bio: "Melodic techno curator with a passion for emotional journeys.",
        socials: {
            instagram: "https://instagram.com/djheejae",
            soundcloud: "https://soundcloud.com/djheejae",
        },
        category: "compass",
    },
    {
        id: "angcherry",
        name: "DJ AngCherry",
        slug: "angcherry",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=1000&fit=crop",
        bio: "Dark and hypnotic techno with industrial influences.",
        socials: {
            instagram: "https://instagram.com/djangcherry",
            soundcloud: "https://soundcloud.com/djangcherry",
        },
        category: "compass",
    },
    {
        id: "liha",
        name: "Liha",
        slug: "liha",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&h=1000&fit=crop",
        bio: "Minimal techno specialist with a focus on groove and rhythm.",
        socials: {
            instagram: "https://instagram.com/liha",
            soundcloud: "https://soundcloud.com/liha",
        },
        category: "compass",
    },
    {
        id: "kyuria",
        name: "DJ Kyuria",
        slug: "kyuria",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=800&h=1000&fit=crop",
        bio: "Experimental techno and ambient soundscapes.",
        socials: {
            instagram: "https://instagram.com/djkyuria",
            soundcloud: "https://soundcloud.com/djkyuria",
        },
        category: "compass",
    },
    {
        id: "don",
        name: "DJ Don",
        slug: "don",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=800&h=1000&fit=crop",
        bio: "Experimental techno and ambient soundscapes.",
        socials: {
            instagram: "https://instagram.com/djkyuria",
            soundcloud: "https://soundcloud.com/djkyuria",
        },
        category: "compass",
    },
    {
        id: "eunwoo",
        name: "Eunwoo",
        slug: "eunwoo",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=1000&fit=crop",
        bio: "Driving techno beats with a touch of trance.",
        socials: {
            instagram: "https://instagram.com/eunwoo",
            soundcloud: "https://soundcloud.com/eunwoo",
        },
        category: "compass",
    },
    {
        id: "wenzi",
        name: "DJ Wenzi",
        slug: "wenzi",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=1000&fit=crop",
        bio: "Hard techno and industrial sounds for the warehouse.",
        socials: {
            instagram: "https://instagram.com/djwenzi",
            soundcloud: "https://soundcloud.com/djwenzi",
        },
        category: "compass",
    },
    {
        id: "toxicb",
        name: "Toxic B",
        slug: "toxicb",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop",
        bio: "Bass-heavy techno with a dark edge.",
        socials: {
            instagram: "https://instagram.com/toxicb",
            soundcloud: "https://soundcloud.com/toxicb",
        },
        category: "compass",
    },
    {
        id: "una",
        name: "U.na",
        slug: "una",
        role: "Resident DJ",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1000&fit=crop",
        bio: "Eclectic techno selector with global influences.",
        socials: {
            instagram: "https://instagram.com/una",
            soundcloud: "https://soundcloud.com/una",
        },
        category: "compass",
    },

    // Partnership Agency Artists
    {
        id: "roha",
        name: "DJ roha",
        slug: "roha",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=1000&fit=crop",
        bio: "Deep and hypnotic techno journeys.",
        socials: {
            instagram: "https://instagram.com/djroha",
            soundcloud: "https://soundcloud.com/djroha",
        },
        category: "partnership",
    },
    {
        id: "siro",
        name: "DJ Siro",
        slug: "siro",
        role: "Partnership Artist",
        image: "/images/artists/siro/main.jpg",
        bio: "Producing most of her tracks solo, SIRO takes full control of the frequencies on stage, creating an immersive experience for her audience. Continuously evolving her sound and performance skills, she’s setting new standards in every set. Keep an eye on her as she pushes boundaries and redefines the dance floor experience",
        socials: {
            instagram: "https://instagram.com/djsiro",
            soundcloud: "https://soundcloud.com/djsiro",
        },
        category: "partnership",
        profileImages: [
            "/images/artists/siro/main.jpg",
            "/images/artists/siro/001.jpg",
            "/images/artists/siro/002.jpg",
            "/images/artists/siro/003.jpg",
            "/images/artists/siro/004.jpg",
            "/images/artists/siro/005.jpg",
        ],
        eventImages: [
            "/images/artists/siro/001.jpg",
            "/images/artists/siro/002.jpg",
            "/images/artists/siro/003.jpg",
        ],
        videos: [
            { id: "v1", title: "SoUL @ Whiterabbit", thumbnail: "https://img.youtube.com/vi/p44lRtxp9Js/maxresdefault.jpg", url: "https://youtu.be/p44lRtxp9Js" },
            { id: "v2", title: "SoUL @ Tan Beach", thumbnail: "https://img.youtube.com/vi/hjwZu4zB9jg/hqdefault.jpg", url: "https://youtu.be/hjwZu4zB9jg" },
        ],
        gigHistory: [
            { date: "2023.05.06", venue: "Whiterabbit", city: "Indonesia, Jakarta", poster: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=800&fit=crop" },
            { date: "2022.07.23", venue: "Tan Beach", city: "Korea, Yangyang", poster: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=800&fit=crop" },
        ],
    },
    {
        id: "vinova",
        name: "DJ VINOVA",
        slug: "vinova",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=800&h=1000&fit=crop",
        bio: "Energetic techno sets with a unique blend of melodic and driving sounds.",
        socials: {
            instagram: "https://instagram.com/djvinova",
            soundcloud: "https://soundcloud.com/djvinova",
        },
        category: "partnership",
    },
    {
        id: "riya",
        name: "DJ Riya",
        slug: "riya",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&h=1000&fit=crop",
        bio: "Melodic techno and progressive house specialist.",
        socials: {
            instagram: "https://instagram.com/djriya",
            soundcloud: "https://soundcloud.com/djriya",
        },
        category: "partnership",
    },
    {
        id: "erry",
        name: "DJ Erry",
        slug: "erry",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=1000&fit=crop",
        bio: "Peak-time techno energy and driving basslines.",
        socials: {
            instagram: "https://instagram.com/djerry",
            soundcloud: "https://soundcloud.com/djerry",
        },
        category: "partnership",
    },
    {
        id: "kissy",
        name: "DJ Kissy",
        slug: "kissy",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=800&h=1000&fit=crop",
        bio: "Groovy house and tech-house selector.",
        socials: {
            instagram: "https://instagram.com/djkissy",
            soundcloud: "https://soundcloud.com/djkissy",
        },
        category: "partnership",
    },
    {
        id: "mochi",
        name: "DJ Mochi",
        slug: "mochi",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1000&fit=crop",
        bio: "Genre-blending sets that keep the dancefloor moving.",
        socials: {
            instagram: "https://instagram.com/djmochi",
            soundcloud: "https://soundcloud.com/djmochi",
        },
        category: "partnership",
    },
    {
        id: "windy",
        name: "DJ Windy",
        slug: "windy",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=1000&fit=crop",
        bio: "Uplifting progressive and trance-influenced techno.",
        socials: {
            instagram: "https://instagram.com/djwindy",
            soundcloud: "https://soundcloud.com/djwindy",
        },
        category: "partnership",
    },
    {
        id: "bliss",
        name: "DJ Bliss",
        slug: "bliss",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=1000&fit=crop",
        bio: "Ethereal soundscapes and ambient techno.",
        socials: {
            instagram: "https://instagram.com/djbliss",
            soundcloud: "https://soundcloud.com/djbliss",
        },
        category: "partnership",
    },
    {
        id: "rana",
        name: "DJ Rana",
        slug: "rana",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop",
        bio: "Hard-hitting techno with industrial textures.",
        socials: {
            instagram: "https://instagram.com/djrana",
            soundcloud: "https://soundcloud.com/djrana",
        },
        category: "partnership",
    },
    {
        id: "tahzan",
        name: "DJ Tahzan",
        slug: "tahzan",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1000&fit=crop",
        bio: "Minimal and hypnotic techno selector.",
        socials: {
            instagram: "https://instagram.com/djtahzan",
            soundcloud: "https://soundcloud.com/djtahzan",
        },
        category: "partnership",
    },
    {
        id: "tory",
        name: "DJ Tory",
        slug: "tory",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=1000&fit=crop",
        bio: "Eclectic techno with global influences.",
        socials: {
            instagram: "https://instagram.com/djtory",
            soundcloud: "https://soundcloud.com/djtory",
        },
        category: "partnership",
    },
    {
        id: "rumihouse",
        name: "DJ Rumihouse",
        slug: "rumihouse",
        role: "Partnership Artist",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=1000&fit=crop",
        bio: "House music specialist bringing good vibes only.",
        socials: {
            instagram: "https://instagram.com/djrumihouse",
            soundcloud: "https://soundcloud.com/djrumihouse",
        },
        category: "partnership",
    },
];

// Mock event data
export const events: Event[] = [
    {
        id: "1",
        date: "2024.11.24",
        venue: "FAUST",
        city: "Seoul",
        poster: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=800&fit=crop",
    },
    {
        id: "2",
        date: "2024.12.02",
        venue: "SHELTER",
        city: "Amsterdam",
        poster: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=800&fit=crop",
    },
];

// Mock release data
export const releases: Release[] = [
    {
        id: "1",
        title: "Underground Sessions Vol. 1",
        year: "2024",
        cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=600&h=600&fit=crop",
        link: "#",
    },
];

// Company Events (Past Events Gallery)
export type CompanyEvent = {
    id: string;
    title: string;
    date: string;
    type: 'image' | 'video';
    src: string;
    thumbnail?: string; // For videos
    slug?: string; // For URL routing
    images?: string[]; // All images in the event folder
};

export const companyEvents: CompanyEvent[] = [
    {
        id: "event-20251119-alta",
        title: "DJ Lua @ Alta Night Club",
        date: "2025.11.19 - Taiwan, Taichung",
        type: "image",
        src: "/images/events/20251119alta/000.jpg",
        slug: "20251119-alta-taichung",
        images: [
            "/images/events/20251119alta/000.jpg",
            "/images/events/20251119alta/001.jpg",
            "/images/events/20251119alta/002.jpg",
            "/images/events/20251119alta/003.jpg",
            "/images/events/20251119alta/004.jpg",
            "/images/events/20251119alta/005.jpg",
            "/images/events/20251119alta/006.jpg",
            "/images/events/20251119alta/007.jpg",
            "/images/events/20251119alta/008.jpg",
            "/images/events/20251119alta/009.jpg",
            "/images/events/20251119alta/010.jpg",
            "/images/events/20251119alta/011.jpg",
            "/images/events/20251119alta/012.jpg",
            "/images/events/20251119alta/013.jpg",
        ],
    },
    {
        id: "event-1",
        title: "Compass Launch Party",
        date: "2023.12",
        type: "image",
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    },
    {
        id: "event-2",
        title: "Summer Festival 2024",
        date: "2024.07",
        type: "image",
        src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    },
    {
        id: "event-3",
        title: "Warehouse Project",
        date: "2024.03",
        type: "image",
        src: "https://images.unsplash.com/photo-1514525253440-b393452e3383?w=800&h=600&fit=crop",
    },
    {
        id: "event-4",
        title: "Techno Bunker",
        date: "2024.05",
        type: "image",
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    },
    // Dummy Events
    {
        id: "dummy-1",
        title: "Neon Nights",
        date: "2024.09",
        type: "image",
        src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-2",
        title: "Rooftop Vibes",
        date: "2024.08",
        type: "image",
        src: "https://images.unsplash.com/photo-1574391884720-385e90e06090?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-3",
        title: "Underground Beats",
        date: "2024.06",
        type: "image",
        src: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-4",
        title: "Sunset Session",
        date: "2024.05",
        type: "image",
        src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-5",
        title: "Midnight Club",
        date: "2024.04",
        type: "image",
        src: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-6",
        title: "Electric Dreams",
        date: "2024.03",
        type: "image",
        src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-7",
        title: "Bass Drop",
        date: "2024.02",
        type: "image",
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-8",
        title: "Vinyl Only",
        date: "2024.01",
        type: "image",
        src: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-9",
        title: "Secret Party",
        date: "2023.12",
        type: "image",
        src: "https://images.unsplash.com/photo-1514525253440-b393452e3383?w=800&h=800&fit=crop",
    },
    {
        id: "dummy-10",
        title: "New Year Bash",
        date: "2023.12",
        type: "image",
        src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop",
    },
    // Example Video Entry - To add a video, uncomment and edit:
    // {
    //     id: "video-1",
    //     title: "Live Set @ Club",
    //     date: "2024.08",
    //     type: "video",
    //     src: "https://www.youtube.com/embed/VIDEO_ID",
    //     thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
    // }
];
