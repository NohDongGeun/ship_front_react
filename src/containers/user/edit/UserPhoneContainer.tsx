import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditUserStore } from '../../../store/user/userEditStore';

const UserPhoneContainer: React.FC = () => {
    const phone = useEditUserStore((state) => state.user?.phone);
    const updateUser = useEditUserStore((state) => state.updateUser);

    const onChangePhone = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateUser({ phone: e.target.value });
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

export default React.memo(UserPhoneContainer);
