const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// 추가할 2023년 이벤트 데이터
const newEventsRaw = `
2023.02.27  Singapore, Singapore @ Club Wave
2023.02.28  Singapore, Singapore @ Club Wave
2023.04.13  Singapore, Singapore @ Lunar
2023.04.22 Korea (South), Korea SoUL, DJ Kara @ Vestiaire Collective 
2023.05.05  Indonesia, Jakarta  SoUL @ WhiteRabbit
2023.05.06  Indonesia, Jakarta  SoUL @ WhiteRabbit
2023.05.19  Indonesia, Jakarta  DJ Risho @ WhiteRabbit
2023.05.20  Indonesia, Jakarta  DJ Risho @ WhiteRabbit
2023.05.26  Indonesia, Jakarta DJ Lua @ WhiteRabbit
2023.05.27  Indonesia, Jakarta  DJ Lua @ WhiteRabbit
2023.06.02 Hongkong, Hongkong  DJ Bxxch @ Sound Department
2023.06.03 Hongkong, Hongkong  DJ Bxxch @ Sound Department
2023.06.16 Hongkong, Hongkong  DJ Kara @ Sound Department
2023.06.17 Hongkong, Hongkong  DJ Kara @ Zentral
2023.06.23 Hongkong, Hongkong DJ Lua @ Sound Department
2023.06.24 Hongkong, Hongkong  DJ Lua @ Zentral
2023.06.29 Malaysia, Johor Bahru  DJ Bxxch @ Vsing Premium
2023.07.02 Malaysia, Johor Bahru  DJ Kara @ Galaxy Star
2023.08.19 Hongkong, Hongkong  DJ Bxxch @ Zentral
2023.08.19 Korea (South)  DJ Lua & DJ Kara @ Cass Cool Summer Festival
2023.09.15   Taiwan, Taichung  DJ Heejae @ 18tc
2023.09.16   Malaysia, Melaka  DJ Bxxch @ Arena Melaka
2023.09.16   Taiwan, Taipei DJ Heejae @ Ai Nightclub
2023.09.17   Taiwan, Taipei DJ Heejae @ Ai Nightclub
2023.09.22  Indonesia, Surabaya  DJ Bxxch @ Meduza Surabaya
2023.09.23  Indonesia, Bali  DJ Bxxch @ Ayana Resort : Rockbar
2023.09.27  Indonesia, Tanggerang  DJ Bxxch @ Wooden bar
2023.09.28  Indonesia, Tanggerang   DJ Bxxch @ Wooden bar
2023.09.29  Indonesia, Balikpapan  DJ Bxxch @ Cartel Club
2023.09.28 China, Yanbian  DJ Heejae, DJ Kara @ Lunar 
2023.09.29 China, Yanbian  DJ Heejae, DJ Kara @ Lunar 
2023.10.01 China, Changchun  DJ Kara, DJ Heejae, DJ Lua @ Club Mota
2023.10.02 China, Changchun  DJ Kara, DJ Heejae, DJ Lua @ Club Mota
2023.10.03 China, Changchun  DJ Kara, DJ Heejae, DJ Lua @ Club Mota
2023.10.04 China, Yanbian   DJ Lua @ Club Reach
2023.10.20 China, Yanbian   DJ Sarah @ Club Reach
2023.10.21 China, Yanbian   DJ Sarah @ Club Reach
2023.10.14  Malaysia, Melaka  DJ Lua @ Arena Melaka
2023.10.28 Indonesia, Manado DJ Bxxch @ Seven 
2023.11.24 Indonesia, Malang  DJ Bxxch @ Odette 
2023.11.25 Indonesia, Tulungagung DJ Bxxch @ Maxy Gold
2023.11.24   Taiwan, Taichung  DJ Lua @ 18tc
2023.11.25   Taiwan, Taipei DJ Lua @ Ai Nightclub
2023.11.26   Taiwan, Taipei DJ Lua @ Ai Nightclub
2023.12.01 Korea (South), Seoul DJ Angcherry, DJ Heejae @ Last Resort  
2023.12.15 Thailand, Pattaya  DJ Lua @ Lucifer
2023.12.16 Thailand, Pattaya  DJ Lua @ Hollywood
2023.12.19 Indonesia, Jakarta  DJ Bxxch @ Travel Club Jakarta 
2023.12.21   Taiwan, Taichung  DJ Angcherry @ Alta Nightclub
2023.12.20 Indonesia, Lombok  DJ Bxxch @ Exective 
2023.12.22 Indonesia, Tulungagung DJ Bxxch @ Maxy Gold 
2023.12.23   Thailand, Bangkok  DJ Kara @ Mu:in  
2023.12.24   Taiwan, Taipei  DJ Angcherry @ Omni Nightclub
2023.12.29 Thailand, Hatyai  DJ Kara @ Hatyai Countdown
2023.12.30 Singapore, Singapore DJ Lua, DJ Kara, DJ Heejae, DJ Angcherry, DJ Risho, DJ Bxxch @ Aquanox Festival
`;

// 파싱 함수
function parseEventLine(line) {
    line = line.trim();
    if (!line) return null;

    // 날짜 추출: YYYY.MM.DD
    const dateMatch = line.match(/^(\d{4})\.(\d{2})\.(\d{2})/);
    if (!dateMatch) return null;

    const [_, year, month, day] = dateMatch;
    const date = `${year}-${month}-${day}`;

    // @ 기준으로 분리
    const atIndex = line.indexOf('@');
    if (atIndex === -1) return null;

    const beforeAt = line.substring(dateMatch[0].length, atIndex).trim();
    const afterAt = line.substring(atIndex + 1).trim();

    // beforeAt에서 city와 artist 분리
    // 형식: City, Country  Artist 또는 City, Country Artist
    let city = '';
    let artist = '';

    // Artist는 대문자로 시작하는 단어들 (DJ, SoUL 등)
    const parts = beforeAt.split(/\s+/);
    let cityParts = [];
    let artistParts = [];
    let foundArtist = false;

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        // DJ로 시작하거나 SoUL이면 artist
        if (part.startsWith('DJ') || part === 'SoUL' || part === 'SoUL,') {
            foundArtist = true;
        }

        if (foundArtist) {
            artistParts.push(part);
        } else {
            cityParts.push(part);
        }
    }

    city = cityParts.join(' ').replace(/,$/, '').trim();
    artist = artistParts.join(' ').replace(/,$/, '').trim();

    const venue = afterAt.trim();

    // ID 생성: event-yyyymmdd-venue (소문자, 공백/특수문자 제거)
    const venueSlug = venue
        .toLowerCase()
        .replace(/[:\-&]/g, ' ')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');

    let id = `event-${year}${month}${day}-${venueSlug}`;

    return {
        id,
        date,
        venue,
        city,
        artist: artist || undefined
    };
}

// 모든 라인 파싱
const lines = newEventsRaw.split('\n').filter(l => l.trim());
const newEvents = lines.map(parseEventLine).filter(e => e !== null);

console.log(`📝 파싱된 이벤트: ${newEvents.length}개\n`);

// ID 중복 체크
const idCounts = {};
newEvents.forEach(e => {
    idCounts[e.id] = (idCounts[e.id] || 0) + 1;
});

const duplicateIds = Object.entries(idCounts).filter(([id, count]) => count > 1);
if (duplicateIds.length > 0) {
    console.log('⚠️  중복 ID 발견 (아티스트 이름 추가 필요):');
    duplicateIds.forEach(([id, count]) => {
        console.log(`   ${id} (${count}회)`);
        const events = newEvents.filter(e => e.id === id);
        events.forEach((e, idx) => {
            const artistSlug = e.artist
                ? e.artist.split(/[,&]/)[0].trim().toLowerCase().replace(/[^a-z0-9]/g, '')
                : `event${idx + 1}`;
            e.id = `${e.id}-${artistSlug}`;
            console.log(`      → ${e.id} (${e.artist})`);
        });
    });
    console.log('');
}

// 기존 파일 읽기
let content = fs.readFileSync(DATA_FILE, 'utf-8');

// events 배열 찾기
const eventsMatch = content.match(/export const events: Event\[\] = \[([\s\S]*?)\];/);
if (!eventsMatch) {
    console.error('❌ events 배열을 찾을 수 없습니다.');
    process.exit(1);
}

// 기존 이벤트 문자열
const existingEventsStr = eventsMatch[1];

// 새 이벤트를 문자열로 변환
const newEventsStr = newEvents.map(e => {
    let str = `    {\n        id: "${e.id}",\n        date: "${e.date}",\n        venue: "${e.venue}",\n        city: "${e.city}"`;
    if (e.artist) {
        str += `,\n        artist: "${e.artist}"`;
    }
    str += `\n    }`;
    return str;
}).join(',\n');

// 새 이벤트를 끝에 추가 (쉼표 추가)
const updatedEventsStr = existingEventsStr.trimEnd() + ',\n' + newEventsStr;

// 파일 내용 교체
const newContent = content.replace(
    /export const events: Event\[\] = \[([\s\S]*?)\];/,
    `export const events: Event[] = [\n${updatedEventsStr}\n];`
);

// 파일 저장
fs.writeFileSync(DATA_FILE, newContent, 'utf-8');

console.log('✅ 2023년 이벤트 추가 완료!');
console.log(`   - 추가된 이벤트: ${newEvents.length}개`);
console.log(`   - 날짜 범위: 2023-02-27 ~ 2023-12-30`);
console.log('\n💡 다음 단계:');
console.log('   1. 날짜순 정렬: node scripts/standardize-events.js');
console.log('   2. 중복 확인: node scripts/verify-events-array.js');
