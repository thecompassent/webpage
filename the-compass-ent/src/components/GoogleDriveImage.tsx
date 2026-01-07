"use client";

import Image, { ImageProps } from 'next/image';
import { getGoogleDriveUrl } from '@/lib/google-drive';

interface GoogleDriveImageProps extends Omit<ImageProps, 'src'> {
    src: string;
    /**
     * Google Drive 파일 ID를 직접 전달할 경우 사용
     * src 대신 driveFileId를 사용하면 자동으로 Google Drive URL로 변환됩니다
     */
    driveFileId?: string;
}

/**
 * Google Drive 이미지 컴포넌트
 * 
 * 사용법 1: 로컬 경로 사용 (google-drive.ts의 매핑 필요)
 * <GoogleDriveImage src="/images/artists/soul/main.jpg" alt="..." />
 * 
 * 사용법 2: Google Drive 파일 ID 직접 사용
 * <GoogleDriveImage src="" driveFileId="1ABC123xyz..." alt="..." />
 * 
 * 사용법 3: Google Drive 공유 링크 직접 사용
 * <GoogleDriveImage src="https://drive.google.com/file/d/FILE_ID/view" alt="..." />
 */
export default function GoogleDriveImage({
    src,
    alt,
    driveFileId,
    ...props
}: GoogleDriveImageProps) {
    let imageSrc = src;

    // driveFileId가 제공된 경우 직접 URL 생성
    if (driveFileId) {
        imageSrc = `https://drive.google.com/uc?export=view&id=${driveFileId}`;
    }
    // src가 Google Drive 링크인 경우 변환
    else if (src.includes('drive.google.com')) {
        imageSrc = getGoogleDriveUrl(src);
    }
    // 로컬 경로인 경우 매핑된 Google Drive URL 확인
    else if (src.startsWith('/images')) {
        imageSrc = getGoogleDriveUrl(src);
    }

    return (
        <Image
            src={imageSrc}
            alt={alt}
            unoptimized={true}
            {...props}
        />
    );
}
