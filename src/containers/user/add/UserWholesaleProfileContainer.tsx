import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';

const UserWholesaleProfileContainer: React.FC = () => {
    const [profile, setProfile] = useState<string>('');

    const onChangeProfile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setProfile(e.target.value);
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

export default React.memo(UserWholesaleProfileContainer);
