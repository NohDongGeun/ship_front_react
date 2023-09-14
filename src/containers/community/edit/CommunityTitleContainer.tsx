import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditCommunityStore } from '../../../store/community/communityEditStore';

const CommunityTitleContainer: React.FC = () => {
    const title = useEditCommunityStore((state) => state.community?.title);
    const setter = useEditCommunityStore((state) => state.update);
    const onChangeTitle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ title: value });
        },
        []
    );

    return (
        <InputWithLabel
            onChange={onChangeTitle}
            value={title ? title : ''}
            label={'제목'}
        />
    );
};

export default React.memo(CommunityTitleContainer);
