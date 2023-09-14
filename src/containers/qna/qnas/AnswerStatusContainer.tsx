import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import Search from '../../../components/commons/Search';
import { useQnasStore } from '../../../store/qna/qnasStore';

const QNA_STATUS_DATA = [
    { id: 1, name: '전체', value: 'all' },
    { id: 2, name: '답변준비', value: 'QNA_STANDBY' },
    { id: 3, name: '답변완료', value: 'QNA_COMPLETE' },
    { id: 4, name: '답변취소', value: 'QNA_CANCLE' },
];

const AnswerStatusContainer: React.FC = () => {
    const qnaStatus = useQnasStore((state) => state.qnaStatus);
    const setter = useQnasStore((state) => state.update);

    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setter({ qnaStatus: value });
    }, []);

    return (
        <FilterItem label={'QNA Status'}>
            <Search
                value={qnaStatus}
                onSelect={onSelectStatus}
                searchItems={QNA_STATUS_DATA}
            />
        </FilterItem>
    );
};

export default React.memo(AnswerStatusContainer);
