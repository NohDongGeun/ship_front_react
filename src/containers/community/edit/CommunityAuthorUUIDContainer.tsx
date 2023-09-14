import React from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditCommunityStore } from '../../../store/community/communityEditStore';

const CommunityAuthorUUIDContainer: React.FC = () => {
    const authorUUID = useEditCommunityStore(
        (state) => state.community?.author.uuid
    );

    return (
        <InputWithLabel
            onChange={() => {}}
            value={authorUUID ? authorUUID : ''}
            label={'유저 UUID'}
            readonly={true}
        />
    );
};

export default React.memo(CommunityAuthorUUIDContainer);
