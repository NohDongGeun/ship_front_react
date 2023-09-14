import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddUserStore } from '../../../store/user/userAddStore';

const UserEmailContainer: React.FC = () => {
    const identyKey = useAddUserStore((state) => state.user.identyKey);
    const updateUser = useAddUserStore((state) => state.updateUser);

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateUser({ identyKey: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'이메일'}
            value={identyKey}
            onChange={onChangeEmail}
        />
    );
};

export default React.memo(UserEmailContainer);
