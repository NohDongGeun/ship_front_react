import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddAdminStore } from '../../../store/admin/adminAddStore';

const AdminPasswordContainer: React.FC = () => {
    const password = useAddAdminStore((state) => state.admin.password);
    const update = useAddAdminStore((state) => state.update);

    const onChangePassword = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ password: e.target.value });
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

export default React.memo(AdminPasswordContainer);
