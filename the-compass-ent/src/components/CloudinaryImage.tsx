"use client";

import Image, { ImageProps } from 'next/image';
import { getImagePath } from '@/lib/utils';

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
    src: string;
}

/**
 * 이미지 컴포넌트 - 로컬 이미지 사용
 */
export default function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
    const finalSrc = getImagePath(src);
    return (
        <Image
            src={finalSrc}
            alt={alt}
            unoptimized={true}
            {...props}
        />
    );
}
