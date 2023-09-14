import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useAddMarketStore } from '../../../store/market/marketAddStore';

const MarketThumbnailContainer: React.FC = () => {
    const thumbnail = useAddMarketStore((state) => state.market.thumbnail);
    const setImageFile = useAddMarketStore((state) => state.set);
    const onHandleFileChange = useCallback(
        (fileName: string, preview: string, file: File) => {
            setImageFile({ thumbnail: { fileName, preview, file } });
        },
        []
    );

    return (
        <ImageUpload
            label={'썸네일'}
            preview={thumbnail ? thumbnail.preview : ''}
            fileName={thumbnail ? thumbnail.fileName : ''}
            onHandleFileChange={onHandleFileChange}
        />
    );
};

export default React.memo(MarketThumbnailContainer);
