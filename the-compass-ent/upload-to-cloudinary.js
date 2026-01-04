const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cloudinary 설정
cloudinary.config({
    cloud_name: 'dqear27jc',
    api_key: '573196375768911',
    api_secret: 'g3idl8qV8g5ugWipfo0Tjy8K40E'
});

const imagesDir = './public/images';

// 지원하는 이미지 확장자
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// 재귀적으로 모든 이미지 파일 찾기
function getAllImages(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getAllImages(filePath, fileList);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (imageExtensions.includes(ext)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

// 이미지 업로드 함수
async function uploadImage(filePath) {
    // public/images/ 이후의 경로를 public_id로 사용
    const relativePath = filePath.replace(/\\/g, '/').replace('./public/images/', '');
    const publicId = 'images/' + relativePath.replace(/\.[^.]+$/, ''); // 확장자 제거

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            overwrite: true,
            resource_type: 'auto'
        });
        console.log(`✅ Uploaded: ${relativePath}`);
        return result;
    } catch (error) {
        console.error(`❌ Failed: ${relativePath} - ${error.message}`);
        return null;
    }
}

// 메인 실행 함수
async function main() {
    console.log('Finding images...');
    const images = getAllImages(imagesDir);
    console.log(`Found ${images.length} images to upload.\n`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < images.length; i++) {
        console.log(`[${i + 1}/${images.length}] Uploading...`);
        const result = await uploadImage(images[i]);
        if (result) {
            success++;
        } else {
            failed++;
        }
    }

    console.log(`\n=== Upload Complete ===`);
    console.log(`Success: ${success}`);
    console.log(`Failed: ${failed}`);
}

main();
