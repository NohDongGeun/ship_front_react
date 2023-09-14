import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditMatchingStore } from '../../../store/matching/matchingEditStore';
const MATCHING_TYPE_DATA = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const MatchingActivateContainer: React.FC = () => {
    const activate = useEditMatchingStore((state) => state.matching?.activate);
    const update = useEditMatchingStore((state) => state.update);
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        update({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            label={'상태'}
            onSelect={onSelectStatus}
            value={`${activate}`}
            searchItems={MATCHING_TYPE_DATA}
        />
    );
};

export default React.memo(MatchingActivateContainer);
