import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const ExpertThumbnailContainer: React.FC = () => {
    const serverThumbnail = useEditExpertStore(
        (state) => state.expert?.thumbnail
    );
    const thumbnailImageFile = useEditExpertStore(
        (state) => state.expert?.thumbnailImageFile
    );
    const setImageFile = useEditExpertStore((state) => state.update);
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

export default React.memo(ExpertThumbnailContainer);
