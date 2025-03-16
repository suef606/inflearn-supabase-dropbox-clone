"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

// 업로드된 파일 정보를 위한 타입 정의
export interface UploadedFileInfo {
  path: string;
  fullPath: string;
  id: string;
  size?: number;
  lastModified?: string;
  // 필요한 다른 정보들도 추가할 수 있습니다
}

export async function uploadFile(formData: FormData): Promise<UploadedFileInfo> {
  const supabase = await createServerSupabaseClient();
  const file = formData.get("file") as File;

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .upload(file.name, file, { upsert: true });

  handleError(error);
  
  // 파일 업로드 후 추가 정보 가져오기
  const fileInfo: UploadedFileInfo = {
    path: data.path,
    fullPath: `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${data.path}`,
    id: data.id || "",
    size: file.size,
    lastModified: new Date().toISOString()
  };

  return fileInfo;
}

// searchFiles 함수는 그대로 유지
export async function searchFiles(search: string = "") {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .list(null, {
      search,
    });

  handleError(error);

  // 파일 목록에 대한 추가 정보를 포함하여 반환할 수 있습니다
  return data.map(item => ({
    ...item,
    fullPath: `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${item.name}`
  }));
}