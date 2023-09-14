import { SelectChangeEvent } from '@mui/material';
import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';

const USER_CAREER_LIST = List([
    { id: 1, value: '1', name: '1년 이상 ~ 5년 미만' },
    { id: 2, value: '2', name: '5년 이상 ~ 10년 미만' },
    { id: 3, value: '3', name: '10년 이상 ~ 20년 미만' },
    { id: 4, value: '4', name: '20년 이상 ~ 30년 미만' },
    { id: 5, value: '5', name: '30년 이상' },
]);

const UserWholesaleCareerContainer: React.FC = () => {
    const [career, setCareer] = useState<string>('');
    const onSelectCareer = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setCareer(value);
    }, []);

    return (
        <SelectWithLabel
            label={'경력'}
            onSelect={onSelectCareer}
            value={career}
            searchItems={USER_CAREER_LIST}
        />
    );
};

export default React.memo(UserWholesaleCareerContainer);
