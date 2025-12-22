const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// 파일 읽기
const content = fs.readFileSync(DATA_FILE, 'utf-8');

// 모든 이벤트 ID 추출
const idMatches = content.matchAll(/id:\s*"(event-[^"]+)"/g);
const ids = Array.from(idMatches, m => m[1]);

// 중복 ID 찾기
const idCounts = {};
ids.forEach(id => {
    idCounts[id] = (idCounts[id] || 0) + 1;
});

const duplicates = Object.entries(idCounts)
    .filter(([id, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

console.log(`📊 총 이벤트: ${ids.length}개`);
console.log(`🔍 중복 ID: ${duplicates.length}개\n`);

if (duplicates.length > 0) {
    console.log('❌ 중복된 ID 목록:');
    duplicates.forEach(([id, count]) => {
        console.log(`   ${id} (${count}회)`);
    });
} else {
    console.log('✅ 중복 없음!');
}

process.exit(duplicates.length > 0 ? 1 : 0);
