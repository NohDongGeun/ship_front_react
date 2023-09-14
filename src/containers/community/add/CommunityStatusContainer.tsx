import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddCommunityStore } from '../../../store/community/communitiesAddStore';

const COMMUNITY_STATUS = [
    { id: 1, value: 'private', name: 'private' },
    { id: 2, value: 'public', name: 'public' },
];

const CommunityStatusContainer: React.FC = () => {
    const status = useAddCommunityStore((state) => state.community.status);
    const setter = useAddCommunityStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ status: value });
    }, []);

    return (
        <SelectWithLabel
            searchItems={COMMUNITY_STATUS}
            label={'커뮤니티 상태'}
            onSelect={onSelctStatus}
            value={`${status}`}
        />
    );
};

export default React.memo(CommunityStatusContainer);
