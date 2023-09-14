import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddFaqStore } from '../../../store/faq/faqAddStore';

const FAQ_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const FaqStatusContainer: React.FC = () => {
    const activate = useAddFaqStore((state) => state.faq.activate);
    const setter = useAddFaqStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ activate: value === 'true' });
    }, []);
    return (
        <SelectWithLabel
            searchItems={FAQ_STATUS}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(FaqStatusContainer);
