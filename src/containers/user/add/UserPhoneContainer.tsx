import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddUserStore } from '../../../store/user/userAddStore';

const UserPhoneContainer: React.FC = () => {
    const phone = useAddUserStore((state) => state.user.phone);
    const updateUser = useAddUserStore((state) => state.updateUser);

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
            value={phone}
        />
    );
};

export default React.memo(UserPhoneContainer);
