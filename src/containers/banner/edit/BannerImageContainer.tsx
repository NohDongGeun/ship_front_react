import React, { useCallback } from 'react';
import ImageUpload from '../../../components/commons/ImageUpload';
import { useEditBannerStore } from '../../../store/banner/bannerEditStore';

const BannerImageContainer: React.FC = () => {
    const serverImage = useEditBannerStore((state) => state.banner?.thumbnail);
    const imageFile = useEditBannerStore((state) => state.banner?.imageFile);
    const update = useEditBannerStore((state) => state.update);

    const onHandleFileChange = useCallback(
        (fileName: string, preview: string, file: File) => {
            update({ imageFile: { fileName, preview, file } });
        },
        []
    );

    return (
        <ImageUpload
            label={'썸네일'}
            preview={imageFile ? imageFile.preview : serverImage}
            fileName={imageFile ? imageFile.fileName : ''}
            onHandleFileChange={onHandleFileChange}
        />
    );
};

export default React.memo(BannerImageContainer);
