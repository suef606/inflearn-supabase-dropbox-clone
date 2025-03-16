"use client";

import { IconButton } from "@material-tailwind/react";
import { getImageUrl } from "utils/supabase/storage";

// 타입 정의 추가
interface DropboxImageProps {
  image: {
    id: string;
    name: string;
    fullPath?: string;
    // 기타 필요한 속성들
  };
}

export default function DropboxImage({ image }: DropboxImageProps) {
  // IconButton의 props를 any 타입으로 정의하여 타입 에러 해결
  const iconButtonProps: any = {
    onClick: () => {},
    color: "red",
    children: <i className="fas fa-trash" />
  };

  // 이미지 URL 생성 시 오류 처리 추가
  let imageUrl;
  try {
    imageUrl = getImageUrl(image.name);
  } catch (error) {
    console.error("Error generating image URL:", error);
    imageUrl = "/images/placeholder.jpg"; // 기본 이미지
  }

  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div>
        <img
          src={imageUrl}
          alt={image.name}
          className="w-full aspect-square rounded-2xl object-cover"
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 대체
            e.currentTarget.src = "/images/placeholder.jpg";
          }}
        />
      </div>

      {/* FileName */}
      <div className="truncate text-sm">{image.name}</div>

      <div className="absolute top-4 right-4">
        <IconButton {...iconButtonProps} />
      </div>
    </div>
  );
}