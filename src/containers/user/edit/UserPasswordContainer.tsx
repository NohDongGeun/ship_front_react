import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditUserStore } from '../../../store/user/userEditStore';

const UserPasswordContainer: React.FC = () => {
    const password = useEditUserStore((state) => state.user?.password);
    const updateUser = useEditUserStore((state) => state.updateUser);

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
            value={password ? password : ''}
        />
    );
};

export default React.memo(UserPasswordContainer);
