const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

// 파일 읽기
let content = fs.readFileSync(DATA_FILE, 'utf-8');

// events 배열 추출
const eventsDecl = 'export const events: Event[] =';
const eventsStartIdx = content.indexOf('[', content.indexOf(eventsDecl) + eventsDecl.length);
let openBrackets = 0;
let eventsEndIdx = -1;

for (let i = eventsStartIdx; i < content.length; i++) {
    if (content[i] === '[') openBrackets++;
    if (content[i] === ']') {
        openBrackets--;
        if (openBrackets === 0) {
            eventsEndIdx = i;
            break;
        }
    }
}

const currentEventsStr = content.substring(eventsStartIdx, eventsEndIdx + 1);
let currentEvents = new Function('return ' + currentEventsStr)();

console.log(`📊 현재 events 데이터: ${currentEvents.length}개`);

// companyEvents 배열 추출
const companyDecl = 'export const companyEvents: CompanyEvent[] =';
const companyStartIdx = content.indexOf('[', content.indexOf(companyDecl) + companyDecl.length);
openBrackets = 0;
let companyEndIdx = -1;

for (let i = companyStartIdx; i < content.length; i++) {
    if (content[i] === '[') openBrackets++;
    if (content[i] === ']') {
        openBrackets--;
        if (openBrackets === 0) {
            companyEndIdx = i;
            break;
        }
    }
}

const companyEventsStr = content.substring(companyStartIdx, companyEndIdx + 1);
let companyEvents = new Function('return ' + companyEventsStr)();

console.log(`📊 companyEvents 데이터: ${companyEvents.length}개`);

// companyEvents를 events 형식으로 변환 및 병합
let restoredCount = 0;

companyEvents.forEach(ce => {
    // 이미 존재하는지 확인
    if (currentEvents.some(e => e.id === ce.id)) return;

    // 날짜 파싱 "2024.09.14 - Thailand, Pattaya"
    const dateParts = ce.date.split(' - ');
    const dateStr = dateParts[0].replace(/\./g, '-'); // 2024-09-14

    let city = '';
    if (dateParts.length > 1) {
        const locationParts = dateParts[1].split(', ');
        if (locationParts.length >= 2) {
            // "Thailand, Pattaya" -> "Pattaya, Thailand" (events 형식에 맞춤)
            // 하지만 events 형식은 "City, Country" 인지 "Country, City" 인지 확인 필요
            // 기존 events: "Singapore, Singapore", "Thailand, Hatyai", "Taiwan, Taipei"
            // 즉 "Country, City" 형식임.
            city = dateParts[1];
        } else {
            city = dateParts[1];
        }
    }

    // Venue & Artist 파싱 "SoUL @ Lucifer"
    const titleParts = ce.title.split(' @ ');
    const artist = titleParts[0];
    const venue = titleParts.length > 1 ? titleParts[1] : '';

    const newEvent = {
        id: ce.id,
        date: dateStr,
        venue: venue,
        city: city,
        artist: artist
    };

    // 2023.12 형식의 날짜 처리 (Launch Party)
    if (dateStr.length === 7) {
        newEvent.date = dateStr; // 그대로 유지
    }

    currentEvents.push(newEvent);
    restoredCount++;
});

console.log(`✅ 복구된 이벤트: ${restoredCount}개`);

// 날짜순 정렬
currentEvents.sort((a, b) => {
    // 날짜 형식이 YYYY-MM-DD 또는 YYYY.MM 일 수 있음
    const dateA = a.date.replace(/\./g, '-');
    const dateB = b.date.replace(/\./g, '-');
    return new Date(dateB) - new Date(dateA);
});

// 다시 문자열로 변환
const newEventsStr = currentEvents.map(e => {
    let str = `    {\n        id: "${e.id}",\n        date: "${e.date}",\n        venue: "${e.venue}",\n        city: "${e.city}"`;
    if (e.artist) {
        str += `,\n        artist: "${e.artist}"`;
    }
    str += `\n    }`;
    return str;
}).join(',\n');

// 파일 저장
const newContent = content.substring(0, eventsStartIdx) + `[\n${newEventsStr}\n]` + content.substring(eventsEndIdx + 1);
fs.writeFileSync(DATA_FILE, newContent, 'utf-8');
console.log('✅ 파일 저장 완료');
