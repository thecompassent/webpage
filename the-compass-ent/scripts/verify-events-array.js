const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// 파일 읽기
const content = fs.readFileSync(DATA_FILE, 'utf-8');

// events 배열만 추출 (companyEvents 제외)
const eventsMatch = content.match(/export const events: Event\[\] = \[([\s\S]*?)\];/);

if (!eventsMatch) {
    console.error('❌ events 배열을 찾을 수 없습니다.');
    process.exit(1);
}

const eventsArrayContent = eventsMatch[1];

// events 배열 내의 ID만 추출
const idMatches = eventsArrayContent.matchAll(/id:\s*"(event-[^"]+)"/g);
const ids = Array.from(idMatches, m => m[1]);

// 중복 ID 찾기
const idCounts = {};
ids.forEach(id => {
    idCounts[id] = (idCounts[id] || 0) + 1;
});

const duplicates = Object.entries(idCounts)
    .filter(([id, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

console.log(`📊 events 배열 분석:`);
console.log(`   - 총 이벤트: ${ids.length}개`);
console.log(`   - 중복 ID: ${duplicates.length}개\n`);

if (duplicates.length > 0) {
    console.log('❌ events 배열 내 중복된 ID:');
    duplicates.forEach(([id, count]) => {
        console.log(`   ${id} (${count}회)`);
    });
    process.exit(1);
} else {
    console.log('✅ events 배열에 중복 없음!');
    console.log('✅ companyEvents는 events를 참조하므로 ID 재사용이 정상입니다.');
    process.exit(0);
}
