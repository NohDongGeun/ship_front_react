import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';

const ADMIN_STATUS_LIST = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const AdminActivateContainer: React.FC = () => {
    const activate = useEditAdminStore((state) => state.admin?.activate);
    const update = useEditAdminStore((state) => state.update);

    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        update({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            label={'상태'}
            onSelect={onSelectStatus}
            value={`${activate}`}
            searchItems={ADMIN_STATUS_LIST}
        />
    );
};

export default React.memo(AdminActivateContainer);
