import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';

const AdminNameContainer: React.FC = () => {
    const name = useEditAdminStore((state) => state.admin?.name);
    const update = useEditAdminStore((state) => state.update);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ name: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'이름'}
            onChange={onChangeName}
            value={name ? name : ''}
        />
    );
};

export default React.memo(AdminNameContainer);
