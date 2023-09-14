import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddCategoryStore } from '../../../store/mainCategory/categoryAddStore';

const CATEGORY_TEST_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const CategoryStatusContainer: React.FC = () => {
    const activate = useAddCategoryStore((state) => state.category.activate);
    const setActivate = useAddCategoryStore((state) => state.setActivate);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setActivate(value === 'true');
    }, []);

    return (
        <SelectWithLabel
            searchItems={CATEGORY_TEST_STATUS}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(CategoryStatusContainer);
