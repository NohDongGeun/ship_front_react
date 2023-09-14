import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const ExpertProfileContainer: React.FC = () => {
    const profile = useEditExpertStore((state) => state.expert?.profile);
    const update = useEditExpertStore((state) => state.update);

    const onChangeProfile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            update({ profile: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'약력'}
            value={profile ? profile : ''}
            onChange={onChangeProfile}
            multiline={true}
        />
    );
};

export default React.memo(ExpertProfileContainer);
