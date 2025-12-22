// Cloudinary 이미지 URL 유틸리티
const CLOUDINARY_CLOUD_NAME = 'dqear27jc';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * 로컬 이미지 경로를 Cloudinary URL로 변환
 * @param localPath - 로컬 이미지 경로 (예: /images/artists/soul/main.jpg)
 * @returns Cloudinary URL
 */
export function getCloudinaryUrl(localPath: string): string {
    // 이미 Cloudinary URL인 경우 그대로 반환
    if (localPath.startsWith('http')) {
        return localPath;
    }

    // /images/... 형태의 경로를 Cloudinary URL로 변환
    // 앞의 슬래시 제거
    const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    return `${CLOUDINARY_BASE_URL}/${cleanPath}`;
}

/**
 * 이미지 경로 배열을 Cloudinary URL 배열로 변환
 */
export function getCloudinaryUrls(localPaths: string[]): string[] {
    return localPaths.map(getCloudinaryUrl);
}

export { CLOUDINARY_BASE_URL, CLOUDINARY_CLOUD_NAME };
