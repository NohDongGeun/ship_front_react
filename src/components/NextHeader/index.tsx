import Head from 'next/head';
import React from 'react';

interface INextHead {
    title: string;
}

const NextHead: React.FC<INextHead> = ({ title }) => {
    return (
        <Head>
            <title>{`시프 관리자 | ${title}`}</title>
        </Head>
    );
};

export default NextHead;
