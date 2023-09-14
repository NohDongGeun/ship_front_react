import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddQnaStore } from '../../../store/qna/qnaAddStore';
import { useEditQnaStore } from '../../../store/qna/qnaEditStore';

const QNA_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const QnaStatusContainer: React.FC = () => {
    const activate = useEditQnaStore((state) => state.qna.activate);
    const setter = useEditQnaStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ activate: value === 'true' });
    }, []);
    return (
        <SelectWithLabel
            searchItems={QNA_STATUS}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(QnaStatusContainer);
