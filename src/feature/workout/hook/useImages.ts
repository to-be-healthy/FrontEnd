import { ChangeEvent, useCallback, useState } from 'react';

import { ImageType } from '@/entity/image';

import { useUploadImageMutation } from '../api/useUploadImageMutation';

const MAX_IMAGES_COUNT = 3;

interface Options {
  maxCount?: number;
}

const useImages = ({ maxCount = MAX_IMAGES_COUNT }: Options = {}) => {
  const [images, setImages] = useState<ImageType[]>([]);

  const { mutate } = useUploadImageMutation();

  const updateImages = (images: ImageType[]) => {
    setImages(images);
  };

  const uploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;
    if (!uploadFiles) return;
    if (images.length + uploadFiles.length > maxCount) {
      alert(`이미지는 최대 ${maxCount}개까지 업로드할 수 있습니다.`);
      return;
    }

    mutate(
      {
        uploadFiles,
      },
      {
        onSuccess: (data) => {
          setImages((prev) => [...prev, ...data.data]);
          e.target.value = '';
        },
      }
    );
  };

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return { images, uploadFiles, clearImages, updateImages };
};

export { useImages };
