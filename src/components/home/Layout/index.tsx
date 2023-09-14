import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import { OVERVIEW } from '../../../constants/pathConstants';
// import Charts from '../../commons/Charts';
import Header from '../../commons/Header';
import { Container, ContentContainer, TableWrapper } from './index.style';

// const NoSsrEditor = dynamic(() => import('../../commons/TuiEditor'), {
//     ssr: false,
// });

// const Test = dynamic(() => import('../../commons/Charts'), {
//     ssr: false,
// });

const Layout: React.FC = () => {
    return (
        <Container>
            <ContentContainer>
                {/* <Header title={OVERVIEW} />
                <TableWrapper>
                    <TableWithFilter />
                </TableWrapper> */}
            </ContentContainer>
        </Container>
    );
};

export default Layout;
