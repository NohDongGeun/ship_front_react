import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useAddBannerStore } from '../../../store/banner/bannerAddStore';

const BannerImageContainer: React.FC = () => {
    const imageFile = useAddBannerStore((state) => state.banner.imageFile);
    const update = useAddBannerStore((state) => state.update);

    const onHandleFileChange = useCallback(
        (fileName: string, preview: string, file: File) => {
            update({ imageFile: { fileName, preview, file } });
        },
        []
    );

    return (
        <ImageUpload
            label={'이미지'}
            preview={imageFile ? imageFile.preview : ''}
            fileName={imageFile ? imageFile.fileName : ''}
            onHandleFileChange={onHandleFileChange}
        />
    );
};

export default React.memo(BannerImageContainer);
