import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getMainCategory } from '../../../api/categories';
import Layout from '../../../components/category/edit/Layout';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import { GET_MAIN_CATEGORY_KEY } from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGetMainCategory } from '../../../hooks/useCategories';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useEditCategoryStore } from '../../../store/mainCategory/categoryEditStore';

interface IEditCategory {
    categoryId: string;
}

const EditCategory: React.FC<IEditCategory> = ({ categoryId }) => {
    const [isInit, setIsInit] = useState(false);
    const init = useEditCategoryStore((state) => state.init);
    const mainCategory = useGetMainCategory(categoryId);

    useEffect(() => {
        if (!mainCategory) return;
        init(mainCategory);
        setIsInit(true);
    }, [mainCategory]);

    if (!isInit) {
        return <></>;
    }

    return (
        <DefaultLayout title={'카테고리 수정'} selectedHref={'categories'}>
            <Layout categoryId={categoryId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditCategory;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [GET_MAIN_CATEGORY_KEY, id],
            queryFn: () =>
                getMainCategory(id as string, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                categoryId: id,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
