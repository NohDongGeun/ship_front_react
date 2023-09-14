import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';

const AdminNicknameContainer: React.FC = () => {
    const nickname = useEditAdminStore((state) => state.admin?.nickname);
    const update = useEditAdminStore((state) => state.update);

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
            value={nickname ? nickname : ''}
        />
    );
};

export default React.memo(AdminNicknameContainer);
