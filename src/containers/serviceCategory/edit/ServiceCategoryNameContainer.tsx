import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryEditStore';

const ServiceCategoryNameCotainer: React.FC = () => {
    const name = useEditServiceCategoryStore(
        (state) => state.serviceCategory?.name
    );
    const update = useEditServiceCategoryStore((state) => state.update);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ name: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'이름'}
            onChange={onChangeName}
            value={name ? name : ''}
        />
    );
};

export default React.memo(ServiceCategoryNameCotainer);
