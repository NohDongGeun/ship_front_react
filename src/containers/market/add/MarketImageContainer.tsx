import React from 'react';
import MultiImageUpload from '../../../components/commons/MultiImageUpload';
import { useAddMarketStore } from '../../../store/market/marketAddStore';

const MarketImageContainer: React.FC = () => {
    const imageFiles = useAddMarketStore((state) => state.market.imageFiles);
    const setter = useAddMarketStore((state) => state.set);

    const onHandleFileChange = (
        fileName: string,
        preview: string,
        file: File
    ) => {
        if (!fileName || !preview || !file) return;

        setter({ imageFiles: [...imageFiles, { fileName, preview, file }] });
    };

    const onDeleteImage = (index: string) => {
        const images = imageFiles.filter((item, iindex) => iindex !== +index);
        setter({ imageFiles: images });
    };

    return (
        <MultiImageUpload
            images={imageFiles}
            onHandleFileChange={onHandleFileChange}
            onDeleteImage={onDeleteImage}
        />
    );
};

export default React.memo(MarketImageContainer);
