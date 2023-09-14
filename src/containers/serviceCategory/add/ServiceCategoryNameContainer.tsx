import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryAddStore';

const ServiceCategoryNameCotainer: React.FC = () => {
    const name = useAddServiceCategoryStore(
        (state) => state.serviceCategory.name
    );
    const update = useAddServiceCategoryStore((state) => state.update);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ name: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel label={'이름'} onChange={onChangeName} value={name} />
    );
};

export default React.memo(ServiceCategoryNameCotainer);
