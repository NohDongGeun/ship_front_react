import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditCommunityCategoryStore } from '../../../store/communityCategory/communityCategoryEditStore';

const CommunityCategoryNameContainer: React.FC = () => {
    const name = useEditCommunityCategoryStore(
        (state) => state.communityCategory?.name
    );
    const update = useEditCommunityCategoryStore((state) => state.update);

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

export default React.memo(CommunityCategoryNameContainer);
