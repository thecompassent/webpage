"use client";

import { artists } from "@/lib/data";
import { getImagePath } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

// DJ Course Data
const djCourses = [
    {
        id: "dj-basic",
        name: "DJ Basic",
        nameKo: "디제잉 기초",
        duration: "3-6 Months",
        image: "https://images.unsplash.com/photo-1571175866023-fa589c372b3c?w=1200&h=800&fit=crop",
        curriculum: [
            "곡의 구조 및 장르 설명",
            "Rekordbox 사용법",
            "장비 구성 설명",
            "음원 수집 및 라이브러리 정리",
            "큐, 플레이, 페이더를 활용한 기초 믹스",
            "비트매칭 (기초, 헤드폰 등)",
            "EQ 믹스 및 레벨 컨트롤",
            "이펙터 기초",
            "백스핀",
            "30분 믹스셋"
        ]
    },
    {
        id: "dj-intermediate",
        name: "DJ Intermediate",
        nameKo: "디제잉 중급",
        duration: "3-6 Months",
        image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&h=800&fit=crop",
        curriculum: [
            "이펙터 활용믹스",
            "슬립 (Slip) 활용",
            "바이닐 (Vinyl Control)",
            "루프 (Loop) 활용",
            "샘플활용 (핫큐 / 샘플덱)",
            "페이더 컨트롤",
            "스크래치 기초",
            "DJ 셀프 마케팅 및 프로모션"
        ]
    },
    {
        id: "dj-advanced",
        name: "DJ Advanced",
        nameKo: "디제잉 고급",
        duration: "3-6 Months",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop",
        curriculum: [
            "멀티덱 컨트롤",
            "루프 활용 고급",
            "키 (Key) 활용믹스 Shift",
            "RMX1000",
            "핫 큐 활용 고급"
        ]
    },
];

// Production Course Data
const productionCourses = [
    {
        id: "prod-basic",
        name: "Production Basic",
        nameKo: "프로듀싱 기초",
        duration: "3-6 Months",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop",
        curriculum: [
            "DAW 기본 구조 이해",
            "프로젝트 템플릿 구성",
            "BPM / Key 개념",
            "곡의 기본 구조 이해 (Intro/Drop/Break/Outro)",
            "드럼 기본 구성",
            "MIDI 트랙 구성 및 편집",
            "샘플 사용법",
            "베이스 기초 (Sub/Mid 개념)",
            "신스 기초 Serum (Oscillator/LFO)",
            "EQ 기초",
            "볼륨 밸런스 기초",
            "Reverb / Delay 기초",
            "8~16마디 루프 제작",
            "1~2분 데모 트랙 완성"
        ]
    },
    {
        id: "prod-intermediate",
        name: "Production Intermediate",
        nameKo: "프로듀싱 중급",
        duration: "3-6 Months",
        image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1200&h=800&fit=crop",
        curriculum: [
            "드럼 디테일링",
            "베이스 & 킥 관계 이해",
            "Sidechain",
            "신스 레이어링",
            "FX 활용 (Risers/Impacts)",
            "오토메이션 활용",
            "EQ (주파수 충돌 정리)",
            "컴프레서 기초",
            "스테레오 이미지 기초",
            "장르별 프로덕션 스타일",
            "풀 트랙 1곡 완성",
            "간단한 믹스 마스터링"
        ]
    },
    {
        id: "prod-advanced",
        name: "Production Advanced",
        nameKo: "프로듀싱 고급",
        duration: "3-6 Months",
        image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=1200&h=800&fit=crop",
        curriculum: [
            "사운드 디자인 (Serum2)",
            "베이스 디자인",
            "음역대별 신스 레이어링",
            "FX 체인 설계",
            "Saturation 활용",
            "Ableton 12 Rack 활용",
            "공간감 설계",
            "DJ 플레이를 고려한 트랙 제작",
            "릴리즈 퀄리티 트랙 완성"
        ]
    },
];

type Course = {
    id: string;
    name: string;
    nameKo: string;
    duration: string;
    image: string;
    curriculum: string[];
};

function CourseItem({ course, isExpanded, onToggle }: { course: Course; isExpanded: boolean; onToggle: () => void }) {
    return (
        <motion.div variants={item} className="group border-b border-foreground relative overflow-hidden">
            {/* Background Image - Full height including curriculum */}
            <div className={`absolute inset-0 transition-all duration-500 ease-out overflow-hidden z-0 bg-black ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <Image
                    src={getImagePath(course.image)}
                    alt={course.name}
                    fill
                    unoptimized={true}
                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
            </div>

            <button
                onClick={onToggle}
                className="block relative w-full py-8 md:py-12 px-2 text-left z-10"
            >
                {/* Course Info */}
                <div className="relative flex flex-col md:flex-row md:items-baseline justify-between gap-4 pl-4 md:pl-8 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                        <h3 className={`text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter transition-colors whitespace-nowrap ${isExpanded ? 'text-white' : 'text-foreground group-hover:text-white'}`}>
                            {course.name}
                        </h3>
                        <span style={{ fontFamily: 'var(--font-noto-kr)' }} className={`text-lg md:text-xl font-medium transition-colors ${isExpanded ? 'text-white/70' : 'text-muted-foreground group-hover:text-white/70'}`}>
                            {course.nameKo}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`text-sm md:text-base font-mono uppercase tracking-widest transition-colors whitespace-nowrap ${isExpanded ? 'text-white/80' : 'text-muted-foreground group-hover:text-white/80'}`}>
                            {course.duration}
                        </span>
                        <ChevronDown
                            className={`w-6 h-6 text-accent transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </div>
                </div>
            </button>

            {/* Expandable Curriculum */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden relative z-10"
                    >
                        <div className="px-8 md:px-16 py-6 md:py-8">
                            <h4 className="text-lg font-oswald font-bold uppercase tracking-tight text-accent mb-4">
                                Curriculum
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-8 md:gap-y-2">
                                {course.curriculum.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-white/80">
                                        <span className="text-accent mt-1">•</span>
                                        <span style={{ fontFamily: 'var(--font-noto-kr)' }} className="text-sm md:text-base font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function AcademyPage() {
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const tutors = artists.filter(artist => ["soul", "roha", "siro", "lant"].includes(artist.id));

    const toggleCourse = (courseId: string) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

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

                {/* DJ Courses */}
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
                            <CourseItem
                                key={course.id}
                                course={course}
                                isExpanded={expandedCourse === course.id}
                                onToggle={() => toggleCourse(course.id)}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Production Courses */}
                <div className="mb-32">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter mb-8 text-accent border-b-2 border-accent pb-2 inline-block">
                        Production Courses
                    </h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col border-t border-foreground mt-8"
                    >
                        {productionCourses.map((course) => (
                            <CourseItem
                                key={course.id}
                                course={course}
                                isExpanded={expandedCourse === course.id}
                                onToggle={() => toggleCourse(course.id)}
                            />
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
