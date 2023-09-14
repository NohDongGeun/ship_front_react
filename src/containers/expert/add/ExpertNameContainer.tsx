import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';

const ExpertNameContainer: React.FC = () => {
    const name = useAddExpertStore((state) => state.expert.name);
    const update = useAddExpertStore((state) => state.update);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ name: value });
        },
        []
    );

    return (
        <InputWithLabel label={'이름'} onChange={onChangeName} value={name} />
    );
};

export default React.memo(ExpertNameContainer);
