import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useAddCategoryStore } from '../../../store/mainCategory/categoryAddStore';

const CategoryIconContainer: React.FC = () => {
    const imageFile = useAddCategoryStore((state) => state.category.imageFile);
    const setImageFile = useAddCategoryStore((state) => state.setImageFile);
    const onHandleFileChange = useCallback(
        (fileName: string, preview: string, file: File) => {
            if (!fileName || !preview || !file) return;

            setImageFile({ fileName, preview, file });
        },
        []
    );

    return (
        <ImageUpload
            label={'아이콘'}
            preview={imageFile ? imageFile.preview : ''}
            fileName={imageFile ? imageFile.fileName : ''}
            onHandleFileChange={onHandleFileChange}
        />
    );
};

export default React.memo(CategoryIconContainer);
