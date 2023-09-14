import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const WholesaleThumbnailContainer: React.FC = () => {
    const thumbnail = useAddWholesaleStore(
        (state) => state.wholesale.thumbnail
    );
    const update = useAddWholesaleStore((state) => state.update);

    const onHandleFileChange = useCallback(
        (fileName: string, preview: string, file: File) => {
            update({ thumbnail: { fileName, preview, file } });
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

export default React.memo(WholesaleThumbnailContainer);
