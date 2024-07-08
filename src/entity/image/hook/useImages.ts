import { ChangeEvent, useCallback, useState } from 'react';

import { useToast } from '@/shared/ui';

import { useCreateS3PresignedUrlMutation } from '../api/useCreateS3PresignedUrlMutation';
import { useS3UploadImagesMutation } from '../api/useS3UploadImagesMutation';
import { ImageType } from '../model/types';

const MAX_IMAGES_COUNT = 3;

interface Options {
  maxCount?: number;
}

const useImages = ({ maxCount = MAX_IMAGES_COUNT }: Options = {}) => {
  const { errorToast } = useToast();
  const [images, setImages] = useState<ImageType[]>([]);

  const { mutate: imageMutate } = useCreateS3PresignedUrlMutation();
  const { mutate: s3UploadMutate } = useS3UploadImagesMutation();

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

    const fileListArray = Array.from(uploadFiles);
    const fileNamesArray = fileListArray.map((file) => file.name);
    imageMutate(fileNamesArray, {
      onSuccess: ({ data }) => {
        const res = data.map((file) => ({
          fileOrder: file.fileOrder,
          fileUrl: file.fileUrl.split('?')[0],
        }));
        e.target.value = '';

        data.map((file, index) => {
          s3UploadMutate(
            { url: file.fileUrl, file: fileListArray[index] },
            {
              onSuccess: () => {
                setImages((prev) => [...prev, ...res]);
              },
            }
          );
        });
      },
      onError: (error) => {
        errorToast(error?.response?.data.message ?? '에러가 발생했습니다');
      },
    });
  };

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return { images, uploadFiles, clearImages, updateImages };
};

export { useImages };
