import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddAdminStore } from '../../../store/admin/adminAddStore';

const AdminNicknameContainer: React.FC = () => {
    const nickname = useAddAdminStore((state) => state.admin.nickname);
    const update = useAddAdminStore((state) => state.update);

    const onChangeNickname = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ nickname: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'닉네임'}
            onChange={onChangeNickname}
            value={nickname}
        />
    );
};

export default React.memo(AdminNicknameContainer);
