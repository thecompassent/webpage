const fs = require('fs');
const path = require('path');

const BACKUP_FILE = path.join(__dirname, '../src/lib/data.backup2.ts');
const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// 백업 파일 읽기
let content = fs.readFileSync(BACKUP_FILE, 'utf-8');

// events 배열 추출
const eventsMatch = content.match(/export const events: Event\[\] = \[([\s\S]*?)\];/);
if (!eventsMatch) {
    console.error('❌ 백업 파일에서 events 배열을 찾을 수 없습니다.');
    process.exit(1);
}

// 기존 이벤트 파싱
const existingEventsStr = eventsMatch[1];
const eventObjects = [];
let braceCount = 0;
let currentEvent = '';
let inEvent = false;

for (let i = 0; i < existingEventsStr.length; i++) {
    const char = existingEventsStr[i];
    if (char === '{') {
        if (braceCount === 0) {
            inEvent = true;
            currentEvent = '';
        }
        braceCount++;
        currentEvent += char;
    } else if (char === '}') {
        braceCount--;
        currentEvent += char;
        if (braceCount === 0 && inEvent) {
            eventObjects.push(currentEvent);
            inEvent = false;
        }
    } else if (inEvent) {
        currentEvent += char;
    }
}

// 객체 문자열을 파싱하여 JS 객체로 변환하는 헬퍼
function parseEventString(str) {
    const id = str.match(/id:\s*"([^"]+)"/)?.[1];
    const date = str.match(/date:\s*"([^"]+)"/)?.[1];
    const venue = str.match(/venue:\s*"([^"]+)"/)?.[1];
    const city = str.match(/city:\s*"([^"]+)"/)?.[1];
    const artist = str.match(/artist:\s*"([^"]+)"/)?.[1];
    const poster = str.match(/poster:\s*"([^"]+)"/)?.[1];
    const slug = str.match(/slug:\s*"([^"]+)"/)?.[1];

    return { id, date, venue, city, artist, poster, slug, original: str };
}

let events = eventObjects.map(parseEventString);

// 1. 사용자가 추가한 새 이벤트들
const newEvents = [
    {
        id: "event-20251015-nabi",
        date: "2025-10-15",
        venue: "Nabi",
        city: "Chengdu, China",
        artist: "Liha",
        poster: "/images/events/20251015one9/000.jpg"
    },
    {
        id: "event-20250815-after-surf",
        date: "2025-08-15",
        venue: "After Surf",
        city: "Yangyang, Korea (South)",
        artist: "Liha",
        poster: "/images/events/20250815after/000.jpg"
    },
    {
        id: "event-20250809-club-enter",
        date: "2025-08-09",
        venue: "Club Enter",
        city: "Suwon, Korea (South)",
        artist: "Liha, Bliss",
        poster: "/images/events/20250809/000.jpg"
    },
    {
        id: "event-20250412-asgard",
        date: "2025-04-12",
        venue: "Asgard",
        city: "Bangkok, Thailand",
        artist: "DJ Kara",
        poster: "/images/events/20250412bkk/000.jpg"
    },
    {
        id: "event-20250412-hatyai-midnight",
        date: "2025-04-12",
        venue: "Hatyai Midnight",
        city: "Hatyai, Thailand",
        artist: "DJ Kara",
        poster: "/images/events/20250412hatyai/000.jpg"
    },
    {
        id: "event-20250219-alta-nightclub",
        date: "2025-02-19",
        venue: "Alta Nightclub",
        city: "Taichung, Taiwan",
        artist: "DJ Riya",
        poster: "/images/events/20250219alta/000.jpg"
    },
    {
        id: "event-20250215-lucifer",
        date: "2025-02-15",
        venue: "Lucifer",
        city: "Pattaya, Thailand",
        artist: "DJ Kara",
        poster: "/images/events/20250215lucifer/000.jpg"
    },
    {
        id: "event-20250214-hollywood",
        date: "2025-02-14",
        venue: "Hollywood",
        city: "Pattaya, Thailand",
        artist: "DJ Kara",
        poster: "/images/events/20250214hollywood/000.jpg"
    },
    {
        id: "event-20250214-aqua-partyclub",
        date: "2025-02-14",
        venue: "Aqua Partyclub",
        city: "Hanoi, Vietnam",
        artist: "DJ Riya",
        poster: "/images/events/20250214aqua/000.jpg"
    }
];

// 2. 포스터 업데이트 매핑
const posterUpdates = {
    "event-20250920-hollywood": "/images/events/20250920hollywood/000.jpg",
    "event-20250919-lucifer": "/images/events/20250919lucifer/000.jpg",
    "event-20250918-alta-nightclub": "/images/events/20250918alta/000.jpg",
    "event-20250917-omni-nightclub": "/images/events/20250917omni/000.jpg",
    "event-20250830-lucifer": "/images/events/20250830lucifer/000.jpg",
    "event-20250830-shinhwa-world": "/images/events/20250830jeju/000.jpg",
    "event-20250829-hollywood-lua": "/images/events/20250829hollywood/000.jpg",
    "event-20250828-omni-nightclub": "/images/events/20250828omni/000.jpg",
    "event-20250827-alta-nightclub": "/images/events/20250827alta/000.jpg",
    "event-20250823-paraclub": "/images/events/20250823paraclub/000.jpg",
    "event-20250816-lucifer": "/images/events/20250816lucifer/000.jpg",
    "event-20250815-hollywood": "/images/events/20250815hollywood/000.jpg",
    "event-20250712-banyantree": "/images/events/20250712banyan/000.jpg",
    "event-20250709-starfield-aquafield": "/images/events/20250709aqua/000.jpg",
    "event-20250621-lucifer": "/images/events/20250621lucifer/000.jpg",
    "event-20250620-hollywood": "/images/events/20250620hollywood/000.jpg",
    "event-20250529-alta-nightclub": "/images/events/20250529alta/000.jpg",
    "event-20250415-central-hatyai": "/images/events/20250415hatyai/000.jpg",
    "event-20250413-udon-songkran": "/images/events/20250413udon/000.jpg"
};

// 기존 이벤트 업데이트
events = events.map(e => {
    if (posterUpdates[e.id]) {
        e.poster = posterUpdates[e.id];
    }
    return e;
});

// 중복 제거 (ID 기준, 나중 것이 우선)
const uniqueEventsMap = new Map();
[...events, ...newEvents].forEach(e => {
    // 이미 존재하는 경우, 새 정보(포스터 등)가 있으면 업데이트
    if (uniqueEventsMap.has(e.id)) {
        const existing = uniqueEventsMap.get(e.id);
        // 포스터가 없는 경우에만 업데이트하거나, 새 이벤트가 포스터를 가지고 있으면 덮어쓰기
        if (!existing.poster && e.poster) {
            uniqueEventsMap.set(e.id, e);
        }
    } else {
        uniqueEventsMap.set(e.id, e);
    }
});

events = Array.from(uniqueEventsMap.values());

// 날짜순 정렬 (최신순)
events.sort((a, b) => b.date.localeCompare(a.date));

// 문자열로 변환
const newEventsStr = events.map(e => {
    let str = `    {
        id: "${e.id}",
        date: "${e.date}",
        venue: "${e.venue}",
        city: "${e.city}",
        artist: "${e.artist}"`;

    if (e.poster) {
        str += `,\n        poster: "${e.poster}"`;
    }
    if (e.slug) {
        str += `,\n        slug: "${e.slug}"`;
    }

    str += `\n    }`;
    return str;
}).join(',\n');

// 파일 내용 교체 (백업 파일 내용을 기반으로 events 배열만 교체)
const newContent = content.replace(
    /export const events: Event\[\] = \[([\s\S]*?)\];/,
    `export const events: Event[] = [\n${newEventsStr}\n];`
);

// 파일 저장
fs.writeFileSync(DATA_FILE, newContent, 'utf-8');
console.log('✅ data.ts 복구 및 업데이트 완료!');
console.log(`   - 총 이벤트: ${events.length}개`);
