import { SelectChangeEvent } from '@mui/material';
import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddBannerStore } from '../../../store/banner/bannerAddStore';

const BANNER_STATUS_TYPE_DATA = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const BannerStatusContainer: React.FC = () => {
    const activate = useAddBannerStore((state) => state.banner.activate);
    const update = useAddBannerStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        update({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            searchItems={BANNER_STATUS_TYPE_DATA}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(BannerStatusContainer);
