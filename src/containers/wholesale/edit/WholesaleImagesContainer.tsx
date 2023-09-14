import React from 'react';
import MultiImageUpload, {
    IImage,
} from '../../../components/commons/MultiImageUpload';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';
import { IMarketPhoto } from '../../../types/market';

const MarketImageContainer: React.FC = () => {
    const storeImages = useEditWholesaleStore(
        (state) => state.wholesale?.images
    );
    const imageFiles = useEditWholesaleStore(
        (state) => state.wholesale?.imageFiles
    );
    const setter = useEditWholesaleStore((state) => state.update);

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

export default React.memo(MarketImageContainer);
