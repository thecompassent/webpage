"use client";

import Image, { ImageProps } from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary';

// 프로덕션 환경에서는 Cloudinary URL 사용
const isProduction = process.env.NODE_ENV === 'production';

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
    src: string;
}

/**
 * Cloudinary 이미지 컴포넌트
 * - 로컬 개발: 로컬 이미지 사용
 * - 프로덕션: Cloudinary URL 사용
 */
export default function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
    // 프로덕션이고 로컬 경로인 경우 Cloudinary URL로 변환
    const imageSrc = isProduction && src.startsWith('/images')
        ? getCloudinaryUrl(src)
        : src;

    return (
        <Image
            src={imageSrc}
            alt={alt}
            {...props}
        />
    );
}
