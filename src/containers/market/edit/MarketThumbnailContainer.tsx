import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useEditMarketStore } from '../../../store/market/marketEditStore';

const MarketThumbnailContainer: React.FC = () => {
    const serverThumbnail = useEditMarketStore(
        (state) => state.market.thumbnail
    );
    const thumbnailImageFile = useEditMarketStore(
        (state) => state.market.thumbnailImageFile
    );
    const setImageFile = useEditMarketStore((state) => state.updateMarket);
    const onHandleFileChange = useCallback(
        (fileName: string, blob: string, file: File) => {
            setImageFile({
                thumbnail: '',
                thumbnailImageFile: { fileName, file, preview: blob },
            });
        },
        []
    );

    return (
        <ImageUpload
            label={'썸네일'}
            preview={
                thumbnailImageFile
                    ? thumbnailImageFile.preview
                    : serverThumbnail
            }
            fileName={
                thumbnailImageFile
                    ? thumbnailImageFile.fileName
                    : serverThumbnail
            }
            onHandleFileChange={onHandleFileChange}
        />
    );
};

export default React.memo(MarketThumbnailContainer);
