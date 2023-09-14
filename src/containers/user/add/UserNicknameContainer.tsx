import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddUserStore } from '../../../store/user/userAddStore';

const UserNicknameContainer: React.FC = () => {
    const nickname = useAddUserStore((state) => state.user.nickname);
    const updateUser = useAddUserStore((state) => state.updateUser);

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
            value={nickname}
        />
    );
};

export default React.memo(UserNicknameContainer);
