import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddUserStore } from '../../../store/user/userAddStore';
const USER_STATUS_LIST = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const UserStatusContainer: React.FC = () => {
    const activate = useAddUserStore((state) => state.user.activate);
    const updateUser = useAddUserStore((state) => state.updateUser);
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        updateUser({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            label={'상태'}
            onSelect={onSelectStatus}
            value={`${activate}`}
            searchItems={USER_STATUS_LIST}
        />
    );
};

export default React.memo(UserStatusContainer);
