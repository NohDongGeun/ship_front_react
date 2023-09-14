import React from 'react';
import MultiImageUpload, {
    IImage,
} from '../../../components/commons/MultiImageUpload';
import { useEditMarketStore } from '../../../store/market/marketEditStore';
import { IMarketPhoto } from '../../../types/market';

const MarketImageContainer: React.FC = () => {
    const storeImages = useEditMarketStore((state) => state.market.images);
    const imageFiles = useEditMarketStore((state) => state.market.imageFiles);
    const setter = useEditMarketStore((state) => state.updateMarket);

    const onHandleFileChange = (name: string, blob: string, file: File) => {
        const tempimages: IImage[] = imageFiles.concat({
            fileName: name,
            file: file,
            preview: blob,
        });
        setter({ imageFiles: tempimages });
    };

    const onDeleteImage = (index: string) => {
        const tempImages = imageFiles.filter((_, iindex) => iindex !== +index);

        setter({ imageFiles: tempImages });
    };

    const onDeleteServerImage = (imageId: number) => {
        const tempImages = storeImages.filter(
            (item) => item.id !== imageId
        ) as IMarketPhoto[];
        setter({ images: tempImages });
    };

    return (
        <MultiImageUpload
            images={imageFiles}
            serverImages={storeImages}
            onHandleFileChange={onHandleFileChange}
            onDeleteImage={onDeleteImage}
            onDeleteServerImage={onDeleteServerImage}
        />
    );
};

export default React.memo(MarketImageContainer);
