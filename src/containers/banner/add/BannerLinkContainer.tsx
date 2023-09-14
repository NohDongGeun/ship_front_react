import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddBannerStore } from '../../../store/banner/bannerAddStore';

const BannerLinkContainer: React.FC = () => {
    const path = useAddBannerStore((state) => state.banner.path);
    const update = useAddBannerStore((state) => state.update);

    const onChangePath = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ path: e.target.value });
        },
        []
    );
    return (
        <InputWithLabel label={'경로'} onChange={onChangePath} value={path} />
    );
};

export default React.memo(BannerLinkContainer);
