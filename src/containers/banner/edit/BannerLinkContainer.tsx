import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditBannerStore } from '../../../store/banner/bannerEditStore';

const BannerLinkContainer: React.FC = () => {
    const path = useEditBannerStore((state) => state.banner?.path);
    const update = useEditBannerStore((state) => state.update);

    const onChangePath = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ path: e.target.value });
        },
        []
    );
    return (
        <InputWithLabel
            label={'경로'}
            onChange={onChangePath}
            value={path ? path : ''}
        />
    );
};

export default React.memo(BannerLinkContainer);
