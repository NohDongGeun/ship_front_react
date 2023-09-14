import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getAdmins } from '../../api/admins';
import Layout from '../../components/admin/admins/Layout';
import DefaultLayout from '../../components/commons/DefaultLayout';
import { PATH_SIGNIN } from '../../constants/pathConstants';
import { GET_ADMINS_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IAdmins {
    queryString: string;
}

const Admins: React.FC<IAdmins> = ({ queryString }) => {
    return (
        <DefaultLayout title={'관리자 목록'} selectedHref={'admins'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Admins;

export const getServerSideProps = useGlobalWrapper(
    async (
        context: GetServerSidePropsContext,
        queryClient: QueryClient,
        session: Session | null | undefined
    ) => {
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [GET_ADMINS_KEY, queryString, session?.user.accessToken],
            queryFn: () => getAdmins(queryString, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                queryString,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
