import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';

const AdminPasswordVerifyContainer: React.FC = () => {
    const passwordVerify = useEditAdminStore(
        (state) => state.admin?.passwordVerify
    );
    const update = useEditAdminStore((state) => state.update);

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
            value={passwordVerify ? passwordVerify : ''}
        />
    );
};

export default React.memo(AdminPasswordVerifyContainer);
