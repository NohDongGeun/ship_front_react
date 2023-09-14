import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddCommunityCategoryStore } from '../../../store/communityCategory/communityCategoryAddStore';
import { useAddServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryAddStore';

const COMMUNITY_CATEGORY_TYPE_DATA = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const CommunityCategoryActivateContainer: React.FC = () => {
    const activate = useAddCommunityCategoryStore(
        (state) => state.communityCategory.activate
    );
    const update = useAddCommunityCategoryStore((state) => state.update);
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        update({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            label={'상태'}
            onSelect={onSelectStatus}
            value={`${activate}`}
            searchItems={COMMUNITY_CATEGORY_TYPE_DATA}
        />
    );
};

export default React.memo(CommunityCategoryActivateContainer);
