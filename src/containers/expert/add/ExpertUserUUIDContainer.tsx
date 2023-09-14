import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';

const ExpertUserUUIDContainer: React.FC = () => {
    const uuid = useAddExpertStore((state) => state.expert.uuid);
    const update = useAddExpertStore((state) => state.update);

    const onChangeUUID = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ uuid: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'유저 UUID'}
            onChange={onChangeUUID}
            value={uuid}
        />
    );
};

export default React.memo(ExpertUserUUIDContainer);
