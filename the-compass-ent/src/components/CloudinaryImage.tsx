"use client";

import Image, { ImageProps } from 'next/image';
import { getGoogleDriveUrl } from '@/lib/google-drive';

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
    src: string;
}

/**
 * 이미지 컴포넌트
 * - Google Drive 매핑이 있으면 Google Drive URL 사용
 * - 없으면 원본 경로 사용
 */
export default function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
    // Google Drive URL로 변환 시도 (항상)
    const imageSrc = src.startsWith('/images')
        ? getGoogleDriveUrl(src)
        : src;

    // Google Drive URL인 경우 unoptimized 설정
    const isGoogleDrive = imageSrc.includes('drive.google.com');

    return (
        <Image
            src={imageSrc}
            alt={alt}
            unoptimized={isGoogleDrive}
            {...props}
        />
    );
}
