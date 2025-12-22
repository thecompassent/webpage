const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

let content = fs.readFileSync(DATA_FILE, 'utf-8');

// Fix 1: DJ Swan event
// 찾기: id가 event-20240928-lucifer이고 artist가 DJ Swan인 항목
const swanRegex = /(id:\s*"event-20240928-lucifer"[\s\S]*?artist:\s*"DJ Swan")/g;
if (swanRegex.test(content)) {
    content = content.replace(swanRegex, 'id: "event-20240928-lucifer-swan"$1'.replace('id: "event-20240928-lucifer"', ''));
    // 위 replace 로직이 좀 복잡하니 단순하게:
    content = content.replace(
        /(id:\s*)"event-20240928-lucifer"([\s\S]*?artist:\s*"DJ Swan")/g,
        '$1"event-20240928-lucifer-swan"$2'
    );
    console.log('✅ DJ Swan 이벤트 ID 수정 완료');
} else {
    console.log('⚠️ DJ Swan 이벤트를 찾을 수 없습니다.');
}

// Fix 2: DJ Kara event
// 찾기: id가 event-20240928-lucifer이고 artist가 DJ Kara인 항목
const karaRegex = /(id:\s*)"event-20240928-lucifer"([\s\S]*?artist:\s*"DJ Kara")/g;
if (karaRegex.test(content)) {
    content = content.replace(karaRegex, '$1"event-20240928-lucifer-kara"$2');
    console.log('✅ DJ Kara 이벤트 ID 수정 완료');
} else {
    console.log('⚠️ DJ Kara 이벤트를 찾을 수 없습니다.');
}

fs.writeFileSync(DATA_FILE, content, 'utf-8');
