import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';

const AdminPhoneContainer: React.FC = () => {
    const phone = useEditAdminStore((state) => state.admin?.phone);
    const update = useEditAdminStore((state) => state.update);

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
            value={phone ? phone : ''}
        />
    );
};

export default React.memo(AdminPhoneContainer);
