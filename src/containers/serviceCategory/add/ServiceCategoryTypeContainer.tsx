import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryAddStore';
const SERVICE_CATEGORY_TYPE_DATA = [
    { id: 1, value: 'FAQ', name: 'FAQ' },
    { id: 2, value: 'QNA', name: 'QNA' },
];

const ServiceCategoryTypeContainer: React.FC = () => {
    const type = useAddServiceCategoryStore(
        (state) => state.serviceCategory.type
    );
    const update = useAddServiceCategoryStore((state) => state.update);
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        update({ type: value });
    }, []);

    return (
        <SelectWithLabel
            label={'상태'}
            onSelect={onSelectStatus}
            value={type}
            searchItems={SERVICE_CATEGORY_TYPE_DATA}
        />
    );
};

export default React.memo(ServiceCategoryTypeContainer);
