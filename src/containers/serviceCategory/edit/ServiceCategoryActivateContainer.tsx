import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryEditStore';
const SERVICE_CATEGORY_TYPE_DATA = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const ServiceCategoryActivateContainer: React.FC = () => {
    const activate = useEditServiceCategoryStore(
        (state) => state.serviceCategory?.activate
    );
    const update = useEditServiceCategoryStore((state) => state.update);
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        update({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            label={'상태'}
            onSelect={onSelectStatus}
            value={`${activate}`}
            searchItems={SERVICE_CATEGORY_TYPE_DATA}
        />
    );
};

export default React.memo(ServiceCategoryActivateContainer);
