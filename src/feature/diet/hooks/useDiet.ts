import { ChangeEvent, createContext, useContext, useState } from 'react';

import { useDietUploadImageMutation } from '@/entity/diet';
import { ImageType } from '@/entity/image';
import { useShowErrorToast } from '@/shared/hooks';

import { DietImageType, DietWithFasting, MealType } from '../model/types';

type ContextType = ReturnType<typeof useDiet> | null;

const DietContext = createContext<ContextType>(null);

const useDietContext = () => {
  const context = useContext(DietContext);

  if (context === null) {
    throw new Error();
  }

  return context;
};

const dietOrder = ['breakfast', 'lunch', 'dinner'];

const useDiet = () => {
  const [images, setImages] = useState<DietImageType[]>([]);
  const [uploadStates, setUploadStates] = useState<Record<string, boolean>>({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const { showErrorToast } = useShowErrorToast();

  const { mutate: uploadImageMutate, isPending: isUploadImagePending } =
    useDietUploadImageMutation();

  const setSortedImages = (images: DietImageType[]) => {
    const sortedImages = images.sort(
      (a, b) => dietOrder.indexOf(a.type) - dietOrder.indexOf(b.type)
    );
    setImages(sortedImages);
  };

  //파일등록
  const uploadFiles = (e: ChangeEvent<HTMLInputElement>, type: MealType) => {
    const uploadFiles = e.target.files;
    if (!uploadFiles) return;

    setUploadStates((prev) => ({ ...prev, [type]: true }));

    uploadImageMutate(
      {
        uploadFiles,
      },
      {
        onSuccess: (data) => {
          const imagesWithType = data.data.map((image: ImageType) => ({
            ...image,
            type,
            fast: false,
          }));
          setImages((prev) => {
            const filteredImages = prev.filter((image) => image.type !== type);
            const newImages = [...filteredImages, ...imagesWithType];
            setSortedImages(newImages);
            return newImages;
          });
          setUploadStates((prev) => ({ ...prev, [type]: false }));
        },
        onError: (error) => {
          showErrorToast(error?.response?.data.message ?? 'Error uploading files');
          setUploadStates((prev) => ({ ...prev, [type]: false }));
        },
      }
    );
  };

  //단식 체크
  const onClickCheckFasting = (type: MealType) => {
    setImages((prev) => {
      const newImages = prev.map((image) => {
        if (image.type === type) {
          return { ...image, fileUrl: null, fast: true };
        }
        return image;
      });
      setSortedImages(newImages);
      return newImages;
    });
  };

  //단식해제
  const onClickCancelFasting = (type: MealType) => {
    setImages((prev) => {
      const newImages = prev.map((image) => {
        if (image.type === type) {
          return { ...image, fileUrl: null, fast: false };
        }
        return image;
      });
      setSortedImages(newImages);
      return newImages;
    });
  };

  const clearImages = (type: MealType) => {
    if (images.length > 0) {
      const res = images.map((image) => {
        if (image.type === type) {
          return { ...image, fileUrl: null };
        }
        return image;
      });
      setSortedImages(res);
    }
  };

  interface InitialImagesProps {
    breakfast: DietWithFasting;
    lunch: DietWithFasting;
    dinner: DietWithFasting;
  }

  const createDietImage = (
    mealType: MealType,
    mealData: DietWithFasting
  ): DietImageType => {
    return {
      fast: mealData?.fast,
      fileOrder: 1,
      fileUrl: mealData?.dietFile ? mealData.dietFile.fileUrl : null,
      type: mealType,
    };
  };

  const InitialImages = (data?: InitialImagesProps) => {

    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];
    const defaultSetting: DietImageType[] = [
      {
        fast: false,
        fileOrder: 1,
        fileUrl: null,
        type: 'breakfast',
      },
      {
        fast: false,
        fileOrder: 1,
        fileUrl: null,
        type: 'lunch',
      },
      {
        fast: false,
        fileOrder: 1,
        fileUrl: null,
        type: 'dinner',
      },
    ];

    if (!data) setSortedImages(defaultSetting);

    if (data) {
      const res = mealTypes.map((mealType) => {
        return createDietImage(mealType, data[mealType]);
      });
      setSortedImages(res);
    }
  };

  return {
    images,
    uploadStates,
    setImages: setSortedImages,
    uploadFiles,
    isUploadImagePending,
    onClickCheckFasting,
    onClickCancelFasting,
    clearImages,
    InitialImages,
  };
};

export { DietContext, useDiet, useDietContext };
