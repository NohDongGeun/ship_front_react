import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../../api/users';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/user/edit/Layout';
import { GET_USER_KEY } from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useGetUser } from '../../../hooks/useUsers';
import { useEditUserStore } from '../../../store/user/userEditStore';

interface IEditUser {
    userId: string;
}

const EditUser: React.FC<IEditUser> = ({ userId }) => {
    const [isInit, setIsInit] = useState(false);
    const initUser = useEditUserStore((state) => state.initUser);
    const user = useGetUser(userId);

    useEffect(() => {
        if (!user) return;
        initUser(user);
        setIsInit(true);
    }, []);

    if (!isInit) {
        return <></>;
    }

    return (
        <DefaultLayout title={'유저 수정'} selectedHref={'users'}>
            <Layout userId={userId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditUser;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [GET_USER_KEY, id, session?.user.accessToken],
            queryFn: () => getUser(id as string, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                userId: id,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
