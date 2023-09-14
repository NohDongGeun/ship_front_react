import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getAdmin } from '../../../api/admins';
import Layout from '../../../components/admin/edit/Layout';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import { GET_ADMIN_KEY } from '../../../constants/queryKeys';
import { useGetAdmin } from '../../../hooks/useAdmins';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';
import Handler from '../../../containers/Handler';

interface IEditAdmin {
    adminId: string;
}

const EditAdmin: React.FC<IEditAdmin> = ({ adminId }) => {
    const [isInit, setIsInit] = useState(false);
    const initAdmin = useEditAdminStore((state) => state.initAdmin);
    const admin = useGetAdmin(adminId);

    useEffect(() => {
        if (!admin) return;
        initAdmin(admin);
        setIsInit(true);
    }, [admin]);

    if (!isInit) {
        return <></>;
    }

    return (
        <DefaultLayout title={'어드민 수정'} selectedHref={'admins'}>
            <Layout adminId={adminId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditAdmin;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [GET_ADMIN_KEY, id, session?.user.accessToken],
            queryFn: () => getAdmin(id as string, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                adminId: id,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
