import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getBanner } from '../../../api/banners';
import Layout from '../../../components/banner/edit/Layout';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import { GET_BANNER_KEY } from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGetBanner } from '../../../hooks/useBanners';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useEditBannerStore } from '../../../store/banner/bannerEditStore';

interface IEditBanner {
    bannerId: string;
}

const EditBanner: React.FC<IEditBanner> = ({ bannerId }) => {
    const [isInit, setIsInit] = useState(false);
    const initBanner = useEditBannerStore((state) => state.init);
    const banner = useGetBanner(bannerId);

    useEffect(() => {
        if (!banner) return;

        initBanner({
            ...banner,
            imageFile: null,
        });

        setIsInit(true);
    }, [banner]);

    if (!isInit) {
        return <></>;
    }
    return (
        <DefaultLayout title={'배너 수ㅁㄴㅇ'} selectedHref={'banners'}>
            <Layout bannerId={bannerId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditBanner;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [GET_BANNER_KEY, id, session?.user.accessToken],
            queryFn: () => getBanner(id as string, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                bannerId: id,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
