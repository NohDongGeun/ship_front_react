import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const EXPERT_CAREER_LIST = [
    { id: 1, value: 'UNTIL_FIVE_YEAR', name: '1년 이상 ~ 5년 미만' },
    { id: 2, value: 'UNTIL_TEN_YEAR', name: '5년 이상 ~ 10년 미만' },
    { id: 3, value: 'UNTIL_TWENTY_YEAR', name: '10년 이상 ~ 20년 미만' },
    { id: 4, value: 'UNTIL_THIRTY_YEAR', name: '20년 이상 ~ 30년 미만' },
    { id: 5, value: 'OVER_THIRTY_YEAR', name: '30년 이상' },
];

const ExpertCareerContainer: React.FC = () => {
    const career = useEditExpertStore((state) => state.expert?.career);
    const update = useEditExpertStore((state) => state.update);

    const onSelectCareer = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        update({ career: value });
    }, []);

    return (
        <SelectWithLabel
            label={'경력'}
            onSelect={onSelectCareer}
            value={career ? career : ''}
            searchItems={EXPERT_CAREER_LIST}
        />
    );
};

export default React.memo(ExpertCareerContainer);
