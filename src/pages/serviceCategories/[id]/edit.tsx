import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getServiceCategory } from '../../../api/serviceCategories';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/serviceCategory/edit/Layout';
import { GET_SERVICE_CATEGORY_KEY } from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useGetServiceCategory } from '../../../hooks/useServiceCategories';
import { useEditServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryEditStore';

interface IEditServiceCategory {
    categoryId: string;
}

const EditServiceCategory: React.FC<IEditServiceCategory> = ({
    categoryId,
}) => {
    const [isInit, setIsInit] = useState(false);
    const init = useEditServiceCategoryStore((state) => state.init);
    const serviceCategory = useGetServiceCategory(categoryId);

    useEffect(() => {
        if (!serviceCategory) return;
        init(serviceCategory);
        setIsInit(true);
    }, []);

    if (!isInit) {
        return <></>;
    }

    return (
        <DefaultLayout
            title={'서비스 카테고리 수정'}
            selectedHref={'serviceCategories'}
        >
            <Layout categoryId={categoryId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditServiceCategory;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [GET_SERVICE_CATEGORY_KEY, id, session?.user.accessToken],
            queryFn: () =>
                getServiceCategory(id as string, session?.user.accessToken),
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
