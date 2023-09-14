import React from 'react';
import MultiImageUpload, {
    IImage,
} from '../../../components/commons/MultiImageUpload';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';
import { IMarketPhoto } from '../../../types/market';

const ExpertImagesContainer: React.FC = () => {
    const storeImages = useEditExpertStore((state) => state.expert?.images);
    const imageFiles = useEditExpertStore((state) => state.expert?.imageFiles);
    const setter = useEditExpertStore((state) => state.update);

    const onHandleFileChange = (name: string, blob: string, file: File) => {
        const tempimages: IImage[] = imageFiles
            ? imageFiles.concat({
                  fileName: name,
                  file: file,
                  preview: blob,
              })
            : [{ fileName: name, file: file, preview: blob }];
        setter({ imageFiles: tempimages });
    };

    const onDeleteImage = (index: string) => {
        const tempImages = imageFiles
            ? imageFiles.filter((_, iindex) => iindex !== +index)
            : [];

        setter({ imageFiles: tempImages });
    };

    const onDeleteServerImage = (imageId: number) => {
        const tempImages = storeImages
            ? (storeImages.filter(
                  (item) => item.id !== imageId
              ) as IMarketPhoto[])
            : [];
        setter({ images: tempImages });
    };

    return (
        <MultiImageUpload
            images={imageFiles ? imageFiles : []}
            serverImages={storeImages}
            onHandleFileChange={onHandleFileChange}
            onDeleteImage={onDeleteImage}
            onDeleteServerImage={onDeleteServerImage}
        />
    );
};

export default React.memo(ExpertImagesContainer);
