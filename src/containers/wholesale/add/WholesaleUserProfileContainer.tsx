import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const WholesaleUserProfileContainer: React.FC = () => {
    const profile = useAddWholesaleStore((state) => state.wholesale.profile);
    const update = useAddWholesaleStore((state) => state.update);

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

export default React.memo(WholesaleUserProfileContainer);
