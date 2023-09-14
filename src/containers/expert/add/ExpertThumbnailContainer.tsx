import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';

const ExpertThumbnailContainer: React.FC = () => {
    const thumbnail = useAddExpertStore((state) => state.expert.thumbnail);
    const update = useAddExpertStore((state) => state.update);

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

export default React.memo(ExpertThumbnailContainer);
