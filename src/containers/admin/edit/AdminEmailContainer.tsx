import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';

const AdminEmailContainer: React.FC = () => {
    const identyKey = useEditAdminStore((state) => state.admin?.identyKey);
    const update = useEditAdminStore((state) => state.update);

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ identyKey: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'이메일'}
            value={identyKey ? identyKey : ''}
            onChange={onChangeEmail}
        />
    );
};

export default React.memo(AdminEmailContainer);
