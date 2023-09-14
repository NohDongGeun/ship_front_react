import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';

const AdminPasswordContainer: React.FC = () => {
    const password = useEditAdminStore((state) => state.admin?.password);
    const update = useEditAdminStore((state) => state.update);

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
            value={password ? password : ''}
        />
    );
};

export default React.memo(AdminPasswordContainer);
