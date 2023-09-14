import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useEditMarketStore } from '../../../store/market/marketEditStore';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';

const MarketThumbnailContainer: React.FC = () => {
    const serverThumbnail = useEditWholesaleStore(
        (state) => state.wholesale?.thumbnail
    );
    const thumbnailImageFile = useEditWholesaleStore(
        (state) => state.wholesale?.thumbnailImageFile
    );
    const setImageFile = useEditWholesaleStore((state) => state.update);
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
