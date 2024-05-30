import { ChangeEvent, useCallback, useState } from 'react';

import { useUploadImageMutation } from '../api/useUploadImageMutation';
import { ImageType } from '../model/types';

interface Options {
  maxCount?: number;
}

const useImages = ({ maxCount = 3 }: Options = {}) => {
  const [images, setImages] = useState<ImageType[]>([]);

  const { mutate } = useUploadImageMutation();

  const uploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;
    if (!uploadFiles) return;
    if (images.length >= maxCount) return;

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

  return { images, uploadFiles, clearImages };
};

export { useImages };
