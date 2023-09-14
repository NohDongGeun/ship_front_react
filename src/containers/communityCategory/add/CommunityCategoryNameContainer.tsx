import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddCommunityCategoryStore } from '../../../store/communityCategory/communityCategoryAddStore';

const CommunityCategoryNameCotainer: React.FC = () => {
    const name = useAddCommunityCategoryStore(
        (state) => state.communityCategory.name
    );
    const update = useAddCommunityCategoryStore((state) => state.update);

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

export default React.memo(CommunityCategoryNameCotainer);
