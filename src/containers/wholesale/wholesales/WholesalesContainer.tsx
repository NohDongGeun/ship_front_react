// src/components/BannerTable.tsx
import React, { useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
    getCareer,
    getDate,
    getStatus,
} from '../../../utils/dataTransformUtils';
import { IWholesale } from '../../../types/wholesale';
import { PATH_WHOLESALES } from '../../../constants/pathConstants';
import { useGetWholesales } from '../../../hooks/useWholesales';

interface IWholesalesContainer {
    queryString: string;
}

const WholesalesContainer: React.FC<IWholesalesContainer> = ({
    queryString,
}) => {
    const router = useRouter();
    const wholesales = useGetWholesales(queryString);

    const onClickRoute = useCallback((wholesaleId: number, userId: number) => {
        router.push(
            `${PATH_WHOLESALES}/${wholesaleId}/edit?userUUId=${userId}`
        );
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Name</TableCell>
                        <TableCell align={'center'}>Store</TableCell>
                        <TableCell align={'center'}>Thumbnail</TableCell>
                        {/* <TableCell align={'center'}>Category</TableCell> */}
                        <TableCell align={'center'}>Career</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {wholesales.map((wholesale: IWholesale) => {
                        return (
                            <TableRow
                                onClick={() =>
                                    onClickRoute(
                                        wholesale.id,
                                        wholesale.user!.id
                                    )
                                }
                                sx={{
                                    cursor: 'pointer',
                                }}
                                key={wholesale.id}
                            >
                                <TableCell align={'center'}>
                                    {wholesale.id}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {wholesale.name}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {wholesale.storeName}
                                </TableCell>
                                {/* <TableCell align={'center'}>
                                        {wholesale.categories}
                                    </TableCell> */}
                                <TableCell align={'center'}>
                                    <img
                                        src={wholesale.thumbnail}
                                        alt={''}
                                        width="100"
                                        height="100"
                                    />
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getCareer(wholesale.career)}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(wholesale.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(wholesale.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(WholesalesContainer);
