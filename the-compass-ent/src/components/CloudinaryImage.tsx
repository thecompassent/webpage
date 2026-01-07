"use client";

import Image, { ImageProps } from 'next/image';

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
    src: string;
}

/**
 * 이미지 컴포넌트 - 로컬 이미지 사용
 */
export default function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            {...props}
        />
    );
}
