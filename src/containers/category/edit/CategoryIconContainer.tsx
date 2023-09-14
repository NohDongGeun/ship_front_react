import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { IImage } from '../../../components/commons/MultiImageUpload';
import { useEditCategoryStore } from '../../../store/mainCategory/categoryEditStore';

const CategoryIconContainer: React.FC = () => {
    const path = useEditCategoryStore((state) => state.category.path);
    const imageFile = useEditCategoryStore((state) => state.category.imageFile);
    const setImageFile = useEditCategoryStore((state) => state.setImageFile);

    const onHandleFileChange = useCallback(
        (fileName: string, preview: string, file: File) => {
            if (!fileName || !preview || !file) return;

            const tempImageFile: IImage = {
                fileName,
                preview,
                file,
            };

            setImageFile(tempImageFile);
        },
        []
    );

    return (
        <ImageUpload
            label={'아이콘'}
            preview={imageFile ? imageFile.preview : path}
            fileName={imageFile ? imageFile.fileName : `${path}`}
            onHandleFileChange={onHandleFileChange}
        />
    );
};

export default React.memo(CategoryIconContainer);
