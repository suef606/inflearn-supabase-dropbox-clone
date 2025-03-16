"use client";

import { IconButton } from "@material-tailwind/react";

export default function DropboxImage() {
  // IconButton의 props를 any 타입으로 정의하여 타입 에러 해결
  const iconButtonProps: any = {
    onClick: () => {},
    color: "red",
    children: <i className="fas fa-trash" />
  };

  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div>
        <img
          src="/images/cutedog.jpeg"
          className="w-full aspect-square rounded-2xl"
        />
      </div>

      {/* FileName */}
      <div className="">cutedog.jpeg</div>

      <div className="absolute top-4 right-4">
        <IconButton {...iconButtonProps} />
      </div>
    </div>
  );
}