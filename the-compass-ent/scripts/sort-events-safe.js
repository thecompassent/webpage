const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// 파일 읽기
let content = fs.readFileSync(DATA_FILE, 'utf-8');

// events 배열 선언부 찾기
const declaration = 'export const events: Event[] =';
const declIdx = content.indexOf(declaration);
if (declIdx === -1) {
    console.error('❌ events 배열 선언을 찾을 수 없습니다.');
    process.exit(1);
}

// 선언부 이후에 나오는 첫 번째 '[' 찾기 (배열 시작)
const startIdx = content.indexOf('[', declIdx + declaration.length);
if (startIdx === -1) {
    console.error('❌ events 배열 시작([)을 찾을 수 없습니다.');
    process.exit(1);
}

// events 배열의 끝 찾기: 시작 위치부터 괄호 짝 맞추기
let openBrackets = 0;
let endIdx = -1;

for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '[') {
        openBrackets++;
    }
    if (content[i] === ']') {
        openBrackets--;
        if (openBrackets === 0) {
            endIdx = i;
            break;
        }
    }
}

if (endIdx === -1) {
    console.error('❌ events 배열의 끝을 찾을 수 없습니다.');
    process.exit(1);
}

// 배열 내용만 추출 ([ ... ])
const arrayStr = content.substring(startIdx, endIdx + 1);

let events;
try {
    // 객체 리터럴 문자열을 파싱하기 위해 eval과 유사한 방식 사용
    events = new Function('return ' + arrayStr)();
} catch (e) {
    console.error('❌ events 배열 파싱 실패:', e);
    // 디버깅을 위해 앞부분 출력
    console.log('파싱 시도 문자열 (앞 100자):', arrayStr.substring(0, 100));
    process.exit(1);
}

console.log(`📊 총 이벤트: ${events.length}개`);

// 날짜순 정렬 (최신순)
events.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
});

console.log('✅ 날짜순 정렬 완료');

// 다시 문자열로 변환
const sortedEventsStr = events.map(e => {
    let str = `    {\n        id: "${e.id}",\n        date: "${e.date}",\n        venue: "${e.venue}",\n        city: "${e.city}"`;
    if (e.artist) {
        str += `,\n        artist: "${e.artist}"`;
    }
    if (e.poster) {
        str += `,\n        poster: "${e.poster}"`;
    }
    if (e.slug) {
        str += `,\n        slug: "${e.slug}"`;
    }
    if (e.gallery) {
        str += `,\n        gallery: ${JSON.stringify(e.gallery)}`;
    }
    str += `\n    }`;
    return str;
}).join(',\n');

// 파일 내용 교체
const newContent = content.substring(0, startIdx) + `[\n${sortedEventsStr}\n]` + content.substring(endIdx + 1);

// 파일 저장
fs.writeFileSync(DATA_FILE, newContent, 'utf-8');
console.log('✅ 파일 저장 완료');
