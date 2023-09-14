import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddCommunityStore } from '../../../store/community/communitiesAddStore';

const CommunityAuthorUUIDContainer: React.FC = () => {
    const authorUUID = useAddCommunityStore(
        (state) => state.community.authorUUID
    );
    const update = useAddCommunityStore((state) => state.update);
    const onChangeUUID = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ authorUUID: value });
        },
        []
    );

    return (
        <InputWithLabel
            onChange={onChangeUUID}
            value={authorUUID}
            label={'유저 UUID'}
        />
    );
};

export default React.memo(CommunityAuthorUUIDContainer);
