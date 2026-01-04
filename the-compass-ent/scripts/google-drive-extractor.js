/**
 * Google Apps Script - 이미지 파일 ID 자동 추출
 * 
 * 사용 방법:
 * 1. Google Drive에 이미지를 업로드한다 (폴더 구조 유지)
 * 2. https://script.google.com 접속
 * 3. 새 프로젝트 생성
 * 4. 이 코드를 붙여넣기
 * 5. ROOT_FOLDER_ID를 자신의 폴더 ID로 변경
 * 6. 실행 (▶️ 버튼)
 * 7. 로그에서 생성된 매핑 복사 (Ctrl+Enter 또는 보기 > 로그)
 */

// ⚠️ images 폴더의 ID를 사용하세요!
// https://drive.google.com/drive/folders/1v9JQ5jAELfFs6KUDkrBn_5tfkB9dh0Dw
const ROOT_FOLDER_ID = '1v9JQ5jAELfFs6KUDkrBn_5tfkB9dh0Dw';

// 기본 경로 (웹사이트에서 사용하는 이미지 경로)
const BASE_PATH = '/images';

/**
 * 메인 함수 - 이것을 실행하세요
 */
function extractAllFileIds() {
    const folder = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const mapping = {};

    Logger.log('🚀 파일 ID 추출 시작...');
    Logger.log('📁 루트 폴더: ' + folder.getName());
    Logger.log('');

    // 재귀적으로 모든 파일 수집
    processFolder(folder, BASE_PATH, mapping);

    // 결과 출력
    Logger.log('');
    Logger.log('========================================');
    Logger.log('📋 생성된 매핑 (이것을 복사하세요):');
    Logger.log('========================================');
    Logger.log('');

    // TypeScript 형식으로 출력
    let output = 'export const googleDriveImageMap: GoogleDriveImageMap = {\n';

    const sortedKeys = Object.keys(mapping).sort();
    for (let i = 0; i < sortedKeys.length; i++) {
        const key = sortedKeys[i];
        output += "    '" + key + "': '" + mapping[key] + "',\n";
    }

    output += '};';

    Logger.log(output);

    // 통계
    Logger.log('');
    Logger.log('========================================');
    Logger.log('📊 통계:');
    Logger.log('========================================');
    Logger.log('총 파일 수: ' + Object.keys(mapping).length);

    return mapping;
}

/**
 * 폴더를 재귀적으로 처리
 */
function processFolder(folder, currentPath, mapping) {
    // 하위 폴더 처리
    const subFolders = folder.getFolders();
    while (subFolders.hasNext()) {
        const subFolder = subFolders.next();
        const subFolderName = subFolder.getName();
        const newPath = currentPath + '/' + subFolderName;
        Logger.log('📁 폴더 처리 중: ' + newPath);
        processFolder(subFolder, newPath, mapping);
    }

    // 파일 처리
    const files = folder.getFiles();
    while (files.hasNext()) {
        const file = files.next();
        const fileName = file.getName();
        const fileId = file.getId();

        // 이미지 파일만 처리
        if (isImageFile(fileName)) {
            const filePath = currentPath + '/' + fileName;
            mapping[filePath] = fileId;
            Logger.log('  ✅ ' + fileName + ' → ' + fileId);
        }
    }
}

/**
 * 이미지 파일인지 확인
 */
function isImageFile(fileName) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowerName = fileName.toLowerCase();
    for (let i = 0; i < imageExtensions.length; i++) {
        if (lowerName.indexOf(imageExtensions[i]) !== -1) {
            return true;
        }
    }
    return false;
}
