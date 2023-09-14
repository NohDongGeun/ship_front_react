import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditUserStore } from '../../../store/user/userEditStore';

const UserNicknameContainer: React.FC = () => {
    const nickname = useEditUserStore((state) => state.user?.nickname);
    const updateUser = useEditUserStore((state) => state.updateUser);

    const onChangeNickname = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateUser({ nickname: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'닉네임'}
            onChange={onChangeNickname}
            value={nickname ? nickname : ''}
        />
    );
};

export default React.memo(UserNicknameContainer);
