import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddCommunityStore } from '../../../store/community/communitiesAddStore';

const CommunityTitleContainer: React.FC = () => {
    const title = useAddCommunityStore((state) => state.community.title);
    const setter = useAddCommunityStore((state) => state.update);
    const onChangeTitle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ title: value });
        },
        []
    );

    return (
        <InputWithLabel onChange={onChangeTitle} value={title} label={'제목'} />
    );
};

export default React.memo(CommunityTitleContainer);
