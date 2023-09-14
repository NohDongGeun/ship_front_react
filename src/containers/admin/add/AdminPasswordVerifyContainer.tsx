import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddAdminStore } from '../../../store/admin/adminAddStore';
import { useAddUserStore } from '../../../store/user/userAddStore';

const AdminPasswordVerifyContainer: React.FC = () => {
    const passwordVerify = useAddAdminStore(
        (state) => state.admin.passwordVerify
    );
    const update = useAddAdminStore((state) => state.update);

    const onChangePasswordVerify = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ passwordVerify: e.target.value });
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

export default React.memo(AdminPasswordVerifyContainer);
