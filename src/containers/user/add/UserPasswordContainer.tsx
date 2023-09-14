import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddUserStore } from '../../../store/user/userAddStore';

const UserPasswordContainer: React.FC = () => {
    const password = useAddUserStore((state) => state.user.password);
    const updateUser = useAddUserStore((state) => state.updateUser);

    const onChangePassword = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateUser({ password: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'비밀번호'}
            onChange={onChangePassword}
            inputType={'password'}
            value={password}
        />
    );
};

export default React.memo(UserPasswordContainer);
