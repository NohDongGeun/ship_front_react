import { SelectChangeEvent } from '@mui/material';
import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
const USER_WHOLESALE_PAYMENT_LIST = List([
    { id: 1, value: '1', name: 'Basic' },
    { id: 2, value: '2', name: 'Platinum' },
    { id: 3, value: '3', name: 'Pro' },
]);

const UserWholesalePaymentContainer: React.FC = () => {
    const [payment, setPayment] = useState<string>('');
    const onSelectPayment = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setPayment(value);
    }, []);

    return (
        <SelectWithLabel
            label={'요금제'}
            onSelect={onSelectPayment}
            value={payment}
            searchItems={USER_WHOLESALE_PAYMENT_LIST}
        />
    );
};

export default React.memo(UserWholesalePaymentContainer);
