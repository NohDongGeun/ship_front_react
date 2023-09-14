import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddMatchingStore } from '../../../store/matching/matchingAddStore';
import { useEditMatchingStore } from '../../../store/matching/matchingEditStore';

const MATCHING_STATUS_LIST = [
    { id: 1, name: '매칭 대기중', value: 'MATCHING_STANDBY' },
    { id: 2, name: '매칭 수락', value: 'MATCHING_ACCEPT' },
    { id: 3, name: '매칭 연결중', value: 'MANAGER_CONNECT' },
    { id: 4, name: '매칭 완료', value: 'MATCHING_COMPLETE' },
    { id: 5, name: '매칭 취소', value: 'MATCHING_CANCLE' },
];

const MatcingStatusContainer: React.FC = () => {
    const matchingStatus = useEditMatchingStore(
        (state) => state.matching?.matchingStatus
    );
    const update = useEditMatchingStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        update({ matchingStatus: value });
    }, []);

    return (
        <SelectWithLabel
            searchItems={MATCHING_STATUS_LIST}
            label={'매칭 상태'}
            onSelect={onSelctStatus}
            value={matchingStatus ? matchingStatus : ''}
        />
    );
};

export default React.memo(MatcingStatusContainer);
