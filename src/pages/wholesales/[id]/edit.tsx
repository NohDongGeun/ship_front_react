import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/wholesale/edit/Layout';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';
import { GET_WHOLESALE_KEY } from '../../../constants/queryKeys';
import { useGetWholesale } from '../../../hooks/useWholesales';
import { getWholesale } from '../../../api/wholesales';
import { PATH_WHOLESALES } from '../../../constants/pathConstants';

interface IEditWholesale {
    userId: string;
    wholesaleId: string;
}

const EditWholesale: React.FC<IEditWholesale> = ({ userId, wholesaleId }) => {
    const [isInit, setIsInit] = useState(false);
    const initWholesale = useEditWholesaleStore((state) => state.initWholesale);
    const wholesale = useGetWholesale(wholesaleId);

    useEffect(() => {
        if (!wholesale) return;
        initWholesale({
            ...wholesale,
            imageFiles: [],
            thumbnailImageFile: null,
        });
        setIsInit(true);
    }, [wholesale]);

    if (!isInit) {
        return <></>;
    }
    return (
        <DefaultLayout title={'도소매 수정'} selectedHref={'wholesales'}>
            <Layout wholesaleId={wholesaleId} userId={userId} />
        </DefaultLayout>
    );
};

export default EditWholesale;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id, userUUId },
        } = context;

        if (!userUUId) {
            return {
                redirect: {
                    destination: `${PATH_WHOLESALES}`,
                    permanent: false,
                },
            };
        }

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [GET_WHOLESALE_KEY, id],
            queryFn: () =>
                getWholesale(id as string, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                wholesaleId: id,
                userId: userUUId,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
