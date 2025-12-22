const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// 파일 읽기
const content = fs.readFileSync(DATA_FILE, 'utf-8');

// events 배열 추출 (간단한 정규식 사용)
const eventsMatch = content.match(/export const events: Event\[\] = \[([\s\S]*?)\];/);

if (!eventsMatch) {
    console.error('❌ events 배열을 찾을 수 없습니다.');
    process.exit(1);
}

const eventsArrayContent = eventsMatch[1];

// 각 이벤트 객체를 추출 (중괄호로 둘러싸인 객체들)
const eventObjects = [];
let braceCount = 0;
let currentEvent = '';
let inEvent = false;

for (let i = 0; i < eventsArrayContent.length; i++) {
    const char = eventsArrayContent[i];

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

console.log(`✅ ${eventObjects.length}개의 이벤트를 찾았습니다.`);

// 각 이벤트 파싱 및 표준화
const parsedEvents = eventObjects.map((eventStr, index) => {
    // 기존 ID 추출
    const idMatch = eventStr.match(/id:\s*"([^"]+)"/);
    const dateMatch = eventStr.match(/date:\s*"([^"]+)"/);
    const venueMatch = eventStr.match(/venue:\s*"([^"]+)"/);

    if (!idMatch || !dateMatch) {
        console.warn(`⚠️  이벤트 ${index + 1}: ID 또는 날짜를 찾을 수 없습니다.`);
        return { original: eventStr, date: '', newId: '' };
    }

    const oldId = idMatch[1];
    const date = dateMatch[1];
    const venue = venueMatch ? venueMatch[1] : '';

    // 날짜를 yyyymmdd 형식으로 변환
    const dateFormatted = date.replace(/-/g, '');

    // venue를 소문자로 변환하고 공백을 하이픈으로 변경
    const venueSlug = venue
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

    // 새 ID 생성
    const newId = `event-${dateFormatted}-${venueSlug}`;

    // ID 교체
    const updatedEvent = eventStr.replace(
        /id:\s*"[^"]+"/,
        `id: "${newId}"`
    );

    console.log(`📝 ${oldId} → ${newId}`);

    return {
        original: eventStr,
        updated: updatedEvent,
        date: date,
        oldId: oldId,
        newId: newId,
        sortKey: date // 정렬을 위한 키
    };
});

console.log('\n📊 날짜순 정렬 중...');

// 날짜순으로 정렬 (최신 → 과거, 내림차순)
parsedEvents.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return b.date.localeCompare(a.date); // 내림차순
});

console.log('✅ 정렬 완료!\n');

// 새로운 events 배열 생성
const newEventsArray = parsedEvents.map(e => e.updated).join(',\n');

// 원본 파일의 events 배열을 새로운 것으로 교체
const newContent = content.replace(
    /export const events: Event\[\] = \[([\s\S]*?)\];/,
    `export const events: Event[] = [\n${newEventsArray}\n];`
);

// 백업 생성
const backupFile = DATA_FILE.replace('.ts', '.backup.ts');
fs.writeFileSync(backupFile, content, 'utf-8');
console.log(`💾 백업 생성: ${backupFile}`);

// 새 파일 저장
fs.writeFileSync(DATA_FILE, newContent, 'utf-8');
console.log(`✅ ${DATA_FILE} 업데이트 완료!`);

console.log(`\n📋 요약:`);
console.log(`   - 총 이벤트: ${parsedEvents.length}개`);
console.log(`   - ID 표준화: event-yyyymmdd-venue 형식`);
console.log(`   - 정렬: 최신 → 과거 (내림차순)`);
