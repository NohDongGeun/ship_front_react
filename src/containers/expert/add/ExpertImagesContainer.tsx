import React, { useCallback } from 'react';
import MultiImageUpload from '../../../components/commons/MultiImageUpload';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const ExpertImagesContainer: React.FC = () => {
    const imageFiles = useAddExpertStore((state) => state.expert.imageFiles);
    const update = useAddExpertStore((state) => state.update);

    const onHandleFileChange = useCallback(
        (fileName: string, preview: string, file: File) => {
            const images = imageFiles.concat({ preview, fileName, file });
            update({ imageFiles: images });
        },
        [imageFiles]
    );

    const onDeleteImage = useCallback(
        (index: string) => {
            const images = imageFiles!.filter((_, iindex) => iindex !== +index);
            update({ imageFiles: images });
        },
        [imageFiles]
    );

    return (
        <MultiImageUpload
            images={imageFiles}
            onHandleFileChange={onHandleFileChange}
            onDeleteImage={onDeleteImage}
        />
    );
};

export default React.memo(ExpertImagesContainer);
