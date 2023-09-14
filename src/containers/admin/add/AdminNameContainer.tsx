import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddAdminStore } from '../../../store/admin/adminAddStore';

const AdminNameContainer: React.FC = () => {
    const name = useAddAdminStore((state) => state.admin.name);
    const update = useAddAdminStore((state) => state.update);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ name: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel label={'이름'} onChange={onChangeName} value={name} />
    );
};

export default React.memo(AdminNameContainer);
