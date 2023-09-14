import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddUserStore } from '../../../store/user/userAddStore';

const UserNameContainer: React.FC = () => {
    const name = useAddUserStore((state) => state.user.name);
    const updateUser = useAddUserStore((state) => state.updateUser);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateUser({ name: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel label={'이름'} onChange={onChangeName} value={name} />
    );
};

export default React.memo(UserNameContainer);
