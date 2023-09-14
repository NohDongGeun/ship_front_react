import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { PATH_MARKETS } from '../../../constants/pathConstants';
import { useRouter } from 'next/router';
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { IMarketAdd } from '../../../types/market';
import { useGetMarkets } from '../../../hooks/useMarkets';

interface IMarketsContainer {
    queryString: string;
}

const MarketsContainer: React.FC<IMarketsContainer> = ({ queryString }) => {
    const router = useRouter();
    const markets = useGetMarkets(queryString);

    const onClickMoveEditPage = (id: number) => {
        router.push(`${PATH_MARKETS}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Name</TableCell>
                        {/* <TableCell align={'center'}>Category</TableCell> */}
                        <TableCell align={'center'}>Icon</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {markets.map((market: IMarketAdd) => {
                        return (
                            <TableRow
                                key={market.id}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => onClickMoveEditPage(market.id)}
                            >
                                <TableCell align={'center'}>
                                    {market.id}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {market.name}
                                </TableCell>
                                {/* <TableCell align={'center'}>
                                    {market.categories}
                                </TableCell> */}
                                <TableCell align={'center'}>
                                    <img
                                        src={`${market.thumbnail}`}
                                        alt={''}
                                        width="100"
                                        height="100"
                                    />
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(market.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(market.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MarketsContainer;
