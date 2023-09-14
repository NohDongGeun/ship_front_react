import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getMainCategories } from '../../../api/categories';
import { getMarket } from '../../../api/markets';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/market/edit/Layout';
import {
    GET_MAIN_CATEGORIES_KEY,
    GET_MARKET_KEY,
} from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useGetMarket } from '../../../hooks/useMarkets';
import { useEditMarketStore } from '../../../store/market/marketEditStore';

interface IEditMarket {
    marketId: string;
}

const EditMarket: React.FC<IEditMarket> = ({ marketId }) => {
    const [isInit, setIsInit] = useState(false);
    const initMarket = useEditMarketStore((state) => state.initMarket);
    const market = useGetMarket(marketId);

    useEffect(() => {
        if (!market) return;

        initMarket({
            ...market,
            imageFiles: [],
            thumbnailImageFile: null,
        });
        setIsInit(true);
    }, [market]);

    if (!isInit) {
        return <></>;
    }
    return (
        <DefaultLayout title={'시장 수정'} selectedHref={'markets'}>
            <Layout marketId={marketId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditMarket;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;

        const session = await getSession(context);
        const categoryQueryString = 'page=1&limit=100&activate=true';

        await Promise.all([
            queryClient.prefetchQuery({
                queryKey: [GET_MARKET_KEY, id, session?.user.accessToken],
                queryFn: () =>
                    getMarket(id as string, session?.user.accessToken),
                staleTime: Infinity,
            }),
            queryClient.prefetchQuery({
                queryKey: [
                    GET_MAIN_CATEGORIES_KEY,
                    categoryQueryString,
                    session?.user.accessToken,
                ],
                queryFn: () =>
                    getMainCategories(
                        categoryQueryString,
                        session?.user.accessToken
                    ),
                staleTime: Infinity,
            }),
        ]);

        return {
            props: {
                session,
                marketId: id,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
