import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddAdminStore } from '../../../store/admin/adminAddStore';

const AdminEmailContainer: React.FC = () => {
    const identyKey = useAddAdminStore((state) => state.admin.identyKey);
    const update = useAddAdminStore((state) => state.update);

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ identyKey: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'이메일'}
            value={identyKey}
            onChange={onChangeEmail}
        />
    );
};

export default React.memo(AdminEmailContainer);
