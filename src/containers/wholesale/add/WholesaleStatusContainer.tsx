import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const MARKET_TEST_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const WholesaleStatusContainer: React.FC = () => {
    const activate = useAddWholesaleStore((state) => state.wholesale.activate);
    const update = useAddWholesaleStore((state) => state.update);

    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        update({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            searchItems={MARKET_TEST_STATUS}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(WholesaleStatusContainer);
