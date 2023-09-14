import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditCategoryStore } from '../../../store/mainCategory/categoryEditStore';

const CATEGORY_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const CategoryStatusContainer: React.FC = () => {
    const activate = useEditCategoryStore((state) => state.category.activate);
    const setActivate = useEditCategoryStore((state) => state.setActivate);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setActivate(value === 'true');
    }, []);

    return (
        <SelectWithLabel
            searchItems={CATEGORY_STATUS}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(CategoryStatusContainer);
