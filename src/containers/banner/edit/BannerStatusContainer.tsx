import { SelectChangeEvent } from '@mui/material';
import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditBannerStore } from '../../../store/banner/bannerEditStore';

const BANNER_TEST_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const BannerStatusContainer: React.FC = () => {
    const activate = useEditBannerStore((state) => state.banner?.activate);
    const setter = useEditBannerStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            searchItems={BANNER_TEST_STATUS}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(BannerStatusContainer);
