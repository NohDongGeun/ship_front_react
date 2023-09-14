import { SelectChangeEvent } from '@mui/material';
import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
const USER_STATUS_LIST = List([
    { id: 1, value: '1', name: '활성화' },
    { id: 2, value: '2', name: '비활성화' },
]);

const UserProStatusContainer: React.FC = () => {
    const [status, setStatus] = useState<string>('');
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setStatus(value);
    }, []);

    return (
        <SelectWithLabel
            label={'상태'}
            onSelect={onSelectStatus}
            value={status}
            searchItems={USER_STATUS_LIST}
        />
    );
};

export default React.memo(UserProStatusContainer);
