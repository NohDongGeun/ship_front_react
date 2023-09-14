import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddQnaStore } from '../../../store/qna/qnaAddStore';

const QNA_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const QnaQnaStatusContainer: React.FC = () => {
    const qnaStatus = useAddQnaStore((state) => state.qna.qnaStatus);
    const setter = useAddQnaStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ qnaStatus: value });
    }, []);
    return (
        <SelectWithLabel
            searchItems={QNA_STATUS}
            label={'QNA 상태'}
            onSelect={onSelctStatus}
            value={qnaStatus}
        />
    );
};

export default React.memo(QnaQnaStatusContainer);
