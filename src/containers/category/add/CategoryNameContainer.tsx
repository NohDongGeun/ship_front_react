import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddCategoryStore } from '../../../store/mainCategory/categoryAddStore';

const CategoryNameContainer: React.FC = () => {
    const name = useAddCategoryStore((state) => state.category.name);
    const setName = useAddCategoryStore((state) => state.setName);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
        },
        []
    );
    return (
        <InputWithLabel label={'이름'} onChange={onChangeName} value={name} />
    );
};

export default React.memo(CategoryNameContainer);
