const fs = require('fs');
const path = require('path');

const BACKUP_FILE = path.join(__dirname, '../src/lib/data.backup2.ts');
const DATA_FILE = path.join(__dirname, '../src/lib/data.ts');

console.log('📝 CompanyEvents 리팩토링 시작...\n');

// 백업 파일 읽기
let content = fs.readFileSync(BACKUP_FILE, 'utf-8');

// Step 1: CompanyEvent 타입 정의는 유지 (호환성)
console.log('✅ CompanyEvent 타입 유지');

// Step 2: companyEvents 배열 찾기
const companyEventsMatch = content.match(/export const companyEvents: CompanyEvent\[\] = \[[\s\S]*?\n\];\s*$/m);

if (!companyEventsMatch) {
    console.error('❌ companyEvents 배열을 찾을 수 없습니다.');
    process.exit(1);
}

// Step 3: 갤러리 이미지 추출 (images 필드가 있는 이벤트만)
const galleryImages = {};
const companyEventsContent = companyEventsMatch[0];

// 각 이벤트 객체를 파싱
const eventMatches = companyEventsContent.matchAll(/\{\s*id:\s*"([^"]+)"[\s\S]*?(?:images:\s*\[([\s\S]*?)\]\s*,?\s*)?\}/g);

for (const match of eventMatches) {
    const id = match[1];
    const imagesBlock = match[2];

    if (imagesBlock) {
        //이미지 경로 추출
        const imagePaths = [];
        const imageMatches = imagesBlock.matchAll(/"([^"]+)"/g);
        for (const imgMatch of imageMatches) {
            imagePaths.push(imgMatch[1]);
        }

        if (imagePaths.length > 0) {
            // ID 표준화: event-20251119-alta -> event-20251119-alta-nightclub
            // events 배열의 ID와 매칭되도록
            let standardId = id;

            // 알려진 매핑
            const idMapping = {
                "event-20251119-alta": "event-20251119-alta-nightclub",
                "event-20251224-alta": "event-20251224-alta-nightclub",
                "event-20250412-hatyai": "event-20250412-hatyai-midnight",
            };

            if (idMapping[id]) {
                standardId = idMapping[id];
            }

            galleryImages[standardId] = imagePaths;
            console.log(`   📸 ${standardId}: ${imagePaths.length}개 이미지`);
        }
    }
}

// Step 4: eventGalleryImages 객체 생성
const galleryImageCode = Object.entries(galleryImages).map(([id, images]) => {
    const imageList = images.map(img => `        "${img}"`).join(',\n');
    return `    "${id}": [\n${imageList}\n    ]`;
}).join(',\n');

const eventGalleryImagesCode = `// Event Gallery Images - Only stores additional gallery images for events
// The main event data comes from the events array above
export const eventGalleryImages: Record<string, string[]> = {
${galleryImageCode}
};`;

// Step 5: companyEvents 배열 제거하고 eventGalleryImages로 교체
const beforeCompanyEvents = content.substring(0, content.indexOf('// Company Events'));
const afterCompanyEvents = ''; // companyEvents 이후에는 파일 끝

const newContent = beforeCompanyEvents + eventGalleryImagesCode + '\n';

// Step 6: 파일 저장
fs.writeFileSync(DATA_FILE, newContent, 'utf-8');

console.log('\n✅ data.ts 리팩토링 완료!');
console.log(`   - 갤러리가 있는 이벤트: ${Object.keys(galleryImages).length}개`);
console.log(`   - companyEvents 배열 제거됨`);
console.log(`   - eventGalleryImages 추가됨`);
