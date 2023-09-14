import { SelectChangeEvent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useCallback, useMemo } from 'react';
import { getCommunityCategories } from '../../../api/communityCategories';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useGetCommunityCategories } from '../../../hooks/useCommunityCategories';
import { useEditCommunityStore } from '../../../store/community/communityEditStore';
import { ICommunityCategory } from '../../../types/communityCategory';

interface ISelectCommunityCategory {
    id: number;
    value: string;
    name: string;
}

const queryString = 'page=1&activate=true&limit=50';

const CommunityCategoryContainer: React.FC = () => {
    const communityCategory = useEditCommunityStore(
        (state) => state.community?.category
    );
    const setter = useEditCommunityStore((state) => state.update);

    const serverCommunityCategories = useGetCommunityCategories(queryString);

    const communityCategories = useMemo(() => {
        if (!serverCommunityCategories) return [];

        const result = serverCommunityCategories.reduce(
            (acc: ISelectCommunityCategory[], cur: ICommunityCategory) => {
                return acc.concat({
                    id: cur.id,
                    name: cur.name,
                    value: `${cur.id}`,
                });
            },
            []
        );
        return result;
    }, [serverCommunityCategories]);

    const onSelctCategory = useCallback(
        (e: SelectChangeEvent<string>) => {
            if (!serverCommunityCategories) return;
            const value = e.target.value;
            const communityCategories = serverCommunityCategories;

            const category = communityCategories.find(
                (item: ICommunityCategory) => item.id === +value
            );

            if (!category) return;

            setter({ category: category });
        },
        [serverCommunityCategories, communityCategory]
    );
    return (
        <SelectWithLabel
            searchItems={communityCategories}
            label={'카테고리 선택'}
            onSelect={onSelctCategory}
            value={communityCategory ? `${communityCategory.id}` : '0'}
        />
    );
};

export default React.memo(CommunityCategoryContainer);
