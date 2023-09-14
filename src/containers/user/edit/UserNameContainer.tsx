import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditUserStore } from '../../../store/user/userEditStore';

const UserNameContainer: React.FC = () => {
    const name = useEditUserStore((state) => state.user?.name);
    const updateUser = useEditUserStore((state) => state.updateUser);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateUser({ name: e.target.value });
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

export default React.memo(UserNameContainer);
