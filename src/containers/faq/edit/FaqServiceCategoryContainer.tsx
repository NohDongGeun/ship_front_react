import { SelectChangeEvent } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useCallback, useMemo } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useGetServiceCategories } from '../../../hooks/useServiceCategories';
import { useAddFaqStore } from '../../../store/faq/faqAddStore';
import { useEditFaqStore } from '../../../store/faq/faqEditStore';
import { IServiceCategory } from '../../../types/serviceCategory';

interface ISelectServiceCategory {
    id: number;
    value: string;
    name: string;
}

const queryString =
    'page=1&searchType=type&searchTypeValue=FAQ&activate=true&limit=50';

const FaqServiceCategoryContainer: React.FC = () => {
    const sesssion = useSession();
    const serviceCategory = useEditFaqStore(
        (state) => state.faq.serviceCategory
    );
    const setter = useAddFaqStore((state) => state.update);

    const serverServiceCategories = useGetServiceCategories(queryString);
    const serviceCategories = useMemo(() => {
        if (!serverServiceCategories) return [];

        const result = serverServiceCategories.reduce(
            (acc: ISelectServiceCategory[], cur: IServiceCategory) => {
                return acc.concat({
                    id: cur.id,
                    name: cur.name,
                    value: `${cur.id}`,
                });
            },
            []
        );
        return result;
    }, [serverServiceCategories]);

    const onSelctCategory = useCallback(
        (e: SelectChangeEvent<string>) => {
            if (!serverServiceCategories) return;
            const value = e.target.value;
            const serviceCategories = serverServiceCategories;

            const category = serviceCategories.find(
                (item: IServiceCategory) => item.id === +value
            );

            if (!category) return;

            setter({ serviceCategory: category });
        },
        [serverServiceCategories]
    );
    return (
        <SelectWithLabel
            searchItems={serviceCategories}
            label={'카테고리 선택'}
            onSelect={onSelctCategory}
            value={serviceCategory ? `${serviceCategory.id}` : '0'}
        />
    );
};

export default React.memo(FaqServiceCategoryContainer);
