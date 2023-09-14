import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddCommunityStore } from '../../../store/community/communitiesAddStore';

const COMMUNITY_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const CommunityActivateContainer: React.FC = () => {
    const activate = useAddCommunityStore((state) => state.community.activate);
    const setter = useAddCommunityStore((state) => state.update);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            searchItems={COMMUNITY_STATUS}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(CommunityActivateContainer);
