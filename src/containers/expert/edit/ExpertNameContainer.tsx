import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const ExpertNameContainer: React.FC = () => {
    const name = useEditExpertStore((state) => state.expert?.name);
    const update = useEditExpertStore((state) => state.update);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ name: value });
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

export default React.memo(ExpertNameContainer);
