import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';
const EXPERT_TYPE_DATA = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const ExpertActivateContainer: React.FC = () => {
    const activate = useEditExpertStore((state) => state.expert?.activate);
    const update = useEditExpertStore((state) => state.update);
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        update({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            label={'상태'}
            onSelect={onSelectStatus}
            value={`${activate}`}
            searchItems={EXPERT_TYPE_DATA}
        />
    );
};

export default React.memo(ExpertActivateContainer);
