const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// 중복 ID 수정 매핑 (수동으로 식별)
const duplicateFixes = {
    // 같은 날짜, 같은 장소에 다른 아티스트가 있는 경우
    'event-20240928-lucifer': [
        { artist: 'DJ Swan', newId: 'event-20240928-lucifer-swan' },
        { artist: 'DJ Kara', newId: 'event-20240928-lucifer-kara' }
    ],
    'event-20240914-lucifer': [
        { artist: 'SoUL', newId: 'event-20240914-lucifer-soul' },
        { artist: 'Liha', newId: 'event-20240914-lucifer-liha' }
    ],
    'event-20250829-hollywood': [
        { artist: 'DJ Lua', newId: 'event-20250829-hollywood-lua' },
        { artist: 'DJ Bliss', newId: 'event-20250829-hollywood-bliss' }
    ],
    'event-20251220-paraclub': [
        { artist: 'DJ Siro', newId: 'event-20251220-paraclub-siro' },
        { artist: 'DJ Toxic-B', newId: 'event-20251220-paraclub-toxicb' }
    ],
    'event-20251224-paraclub': [
        { artist: 'DJ Toxic-B', newId: 'event-20251224-paraclub-toxicb' },
        { artist: 'DJ U.na', newId: 'event-20251224-paraclub-una' }
    ],
    'event-20251226-paraclub': [
        { artist: 'DJ U.na', newId: 'event-20251226-paraclub-una' },
        { artist: 'Liha', newId: 'event-20251226-paraclub-liha' }
    ]
};

let content = fs.readFileSync(DATA_FILE, 'utf-8');

// 각 중복 ID에 대해 수정
Object.entries(duplicateFixes).forEach(([duplicateId, fixes]) => {
    console.log(`\n🔧 수정 중: ${duplicateId}`);

    fixes.forEach(fix => {
        // 해당 아티스트를 가진 이벤트를 찾아서 ID 변경
        const pattern = new RegExp(
            `(id:\\s*"${duplicateId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?artist:\\s*"[^"]*${fix.artist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*")`,
            'g'
        );

        const matches = content.match(pattern);
        if (matches && matches.length > 0) {
            // 첫 번째 매치만 변경 (중복 방지)
            content = content.replace(
                pattern,
                (match) => {
                    if (!match.includes(fix.newId)) {
                        return match.replace(`id: "${duplicateId}"`, `id: "${fix.newId}"`);
                    }
                    return match;
                }
            );
            console.log(`   ✅ ${fix.artist}: ${duplicateId} → ${fix.newId}`);
        } else {
            console.log(`   ⚠️  ${fix.artist}: 매치 없음`);
        }
    });
});

// 백업 생성
const backupFile = DATA_FILE.replace('.ts', '.backup2.ts');
fs.writeFileSync(backupFile, fs.readFileSync(DATA_FILE, 'utf-8'), 'utf-8');
console.log(`\n💾 백업: ${backupFile}`);

// 파일 저장
fs.writeFileSync(DATA_FILE, content, 'utf-8');
console.log(`✅ 저장 완료: ${DATA_FILE}\n`);
