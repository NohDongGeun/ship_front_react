import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';

const ExpertProfileContainer: React.FC = () => {
    const profile = useAddExpertStore((state) => state.expert.profile);
    const update = useAddExpertStore((state) => state.update);

    const onChangeProfile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            update({ profile: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'약력'}
            value={profile}
            onChange={onChangeProfile}
            multiline={true}
        />
    );
};

export default React.memo(ExpertProfileContainer);
