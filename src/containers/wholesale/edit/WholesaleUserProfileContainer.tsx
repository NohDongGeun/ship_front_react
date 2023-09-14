import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';

const WholesaleUserProfileContainer: React.FC = () => {
    const profile = useEditWholesaleStore((state) => state.wholesale?.profile);
    const update = useEditWholesaleStore((state) => state.update);

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

export default React.memo(WholesaleUserProfileContainer);
