import React, { useCallback } from 'react';
import MultiImageUpload from '../../../components/commons/MultiImageUpload';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const WholesaleImagesContainer: React.FC = () => {
    const imageFiles = useAddWholesaleStore(
        (state) => state.wholesale.imageFiles
    );
    const update = useAddWholesaleStore((state) => state.update);

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

export default React.memo(WholesaleImagesContainer);
