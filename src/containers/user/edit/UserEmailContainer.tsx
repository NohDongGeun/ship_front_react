import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditUserStore } from '../../../store/user/userEditStore';

const UserEmailContainer: React.FC = () => {
    const email = useEditUserStore((state) => state.user?.identyKey);
    const updateUser = useEditUserStore((state) => state.updateUser);

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateUser({ identyKey: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'이메일'}
            value={email ? email : ''}
            onChange={onChangeEmail}
        />
    );
};

export default React.memo(UserEmailContainer);
