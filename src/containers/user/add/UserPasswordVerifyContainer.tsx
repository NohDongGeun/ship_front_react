import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddUserStore } from '../../../store/user/userAddStore';

const UserPasswordVerifyContainer: React.FC = () => {
    const passwordVerify = useAddUserStore(
        (state) => state.user.passwordVerify
    );
    const updateUser = useAddUserStore((state) => state.updateUser);

    const onChangePasswordVerify = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateUser({ passwordVerify: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'비밀번호 확인'}
            onChange={onChangePasswordVerify}
            inputType={'password'}
            value={passwordVerify}
        />
    );
};

export default React.memo(UserPasswordVerifyContainer);
