import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteCommunityCategory } from '../../../api/communityCategories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { useGetCommunityCategory } from '../../../hooks/useCommunityCategories';

interface IDeleteContainer {
    categoryId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ categoryId }) => {
    const session = useSession();
    const mutation = useMutation(
        (data: { categoryId: string; accessToken: string }) =>
            deleteCommunityCategory(data.categoryId, data.accessToken)
    );
    const oldbie = useGetCommunityCategory(categoryId);

    const onSubmit = useCallback(() => {
        if (!oldbie) return;

        if (oldbie.activate) {
            alert(
                '해당 카테고리는 활성화 되어 있습니다. 비활성화 후 삭제해주세요.'
            );
            return;
        }
        const accessToken = session.data?.user.accessToken;

        mutation.mutate({ categoryId, accessToken });
    }, [categoryId, session, oldbie]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default React.memo(DeleteContainer);
