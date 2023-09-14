import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import Search from '../../../components/commons/Search';
import { useMatchingsStore } from '../../../store/matching/matchingsStore';

const MATCHING_STATUS_TEST_DATA = [
    { id: 1, name: '전체', value: 'all' },
    { id: 2, name: '매칭 대기중', value: 'MATCHING_STANDBY' },
    { id: 3, name: '매칭 수락', value: 'MATCHING_ACCEPT' },
    { id: 4, name: '매칭 연결중', value: 'MANAGER_CONNECT' },
    { id: 5, name: '매칭 완료', value: 'MATCHING_COMPLETE' },
    { id: 6, name: '매칭 취소', value: 'MATCHING_CANCLE' },
];

const MatchingStatusContainer: React.FC = () => {
    const matchingStatus = useMatchingsStore((state) => state.matchingStatus);
    const setter = useMatchingsStore((state) => state.set);

    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ matchingStatus: value });
    }, []);

    return (
        <FilterItem label={'Matching status'}>
            <Search
                value={matchingStatus}
                onSelect={onSelectStatus}
                searchItems={MATCHING_STATUS_TEST_DATA}
            />
        </FilterItem>
    );
};

export default React.memo(MatchingStatusContainer);
