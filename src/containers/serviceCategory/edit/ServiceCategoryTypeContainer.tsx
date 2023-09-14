import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryEditStore';
const SERVICE_CATEGORY_TYPE_DATA = [
    { id: 1, value: 'FAQ', name: 'FAQ' },
    { id: 2, value: 'QNA', name: 'QNA' },
];

const ServiceCategoryTypeContainer: React.FC = () => {
    const type = useEditServiceCategoryStore(
        (state) => state.serviceCategory?.type
    );
    const update = useEditServiceCategoryStore((state) => state.update);
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        update({ type: value });
    }, []);

    return (
        <SelectWithLabel
            label={'상태 (변경불가)'}
            onSelect={onSelectStatus}
            value={type ? type : ''}
            readOnly={true}
            searchItems={SERVICE_CATEGORY_TYPE_DATA}
        />
    );
};

export default React.memo(ServiceCategoryTypeContainer);
