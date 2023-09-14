import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useGetCommunityCategories } from '../../../hooks/useCommunityCategories';
import { useAddCommunityStore } from '../../../store/community/communitiesAddStore';
import { ICommunityCategory } from '../../../types/communityCategory';

interface ISelectCommunityCategory {
    id: number;
    value: string;
    name: string;
}

const queryString = 'page=1&activate=true&limit=50';

const CommunityCategoryContainer: React.FC = () => {
    const communityCategory = useAddCommunityStore(
        (state) => state.community.communityCategory
    );
    const setter = useAddCommunityStore((state) => state.update);
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

            setter({ communityCategory: category });
        },
        [serverCommunityCategories, communityCategory]
    );
    return (
        <SelectWithLabel
            searchItems={communityCategories}
            label={'카테고리 선택'}
            onSelect={onSelctCategory}
            readOnly={false}
            value={communityCategory ? `${communityCategory.id}` : '0'}
        />
    );
};

export default React.memo(CommunityCategoryContainer);
