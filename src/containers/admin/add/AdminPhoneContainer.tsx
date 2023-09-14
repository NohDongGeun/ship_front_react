import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddAdminStore } from '../../../store/admin/adminAddStore';

const AdminPhoneContainer: React.FC = () => {
    const phone = useAddAdminStore((state) => state.admin.phone);
    const update = useAddAdminStore((state) => state.update);

    const onChangePhone = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ phone: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'핸드폰 번호'}
            onChange={onChangePhone}
            value={phone}
        />
    );
};

export default React.memo(AdminPhoneContainer);
