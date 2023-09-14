import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditQnaStore } from '../../../store/qna/qnaEditStore';
import { QNA_STATUS_DATA } from '../../../utils/dataTransformUtils';

const QnaQnaStatusContainer: React.FC = () => {
    const qnaStatus = useEditQnaStore((state) => state.qna.qnaStatus);
    const setter = useEditQnaStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ qnaStatus: value });
    }, []);

    return (
        <SelectWithLabel
            searchItems={QNA_STATUS_DATA}
            label={'QNA 상태'}
            onSelect={onSelctStatus}
            value={qnaStatus}
        />
    );
};

export default React.memo(QnaQnaStatusContainer);
