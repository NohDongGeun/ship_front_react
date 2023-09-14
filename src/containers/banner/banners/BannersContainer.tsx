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
    Typography,
} from '@mui/material';
import { IBanner } from '../../../types/banner';
import { useRouter } from 'next/router';
import { PATH_BANNERS } from '../../../constants/pathConstants';
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { useGetBanners } from '../../../hooks/useBanners';

interface IBannersContainer {
    queryString: string;
}

const BannersContainer: React.FC<IBannersContainer> = ({ queryString }) => {
    const router = useRouter();
    const banners = useGetBanners(queryString);

    const onClickMoveEditPage = useCallback((id: number) => {
        router.push(`${PATH_BANNERS}/${id}/edit`);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Image</TableCell>
                        <TableCell align={'center'}>Link</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {banners.map((banner: IBanner) => {
                        return (
                            <TableRow
                                key={banner.id}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => onClickMoveEditPage(banner.id)}
                            >
                                <TableCell align={'center'}>
                                    {banner.id}
                                </TableCell>
                                <TableCell align={'center'}>
                                    <img
                                        src={banner.thumbnail}
                                        alt={''}
                                        width="100"
                                        height="66.6"
                                    />
                                </TableCell>
                                <TableCell align={'center'}>
                                    <Typography
                                        component={'a'}
                                        href={banner.path}
                                        sx={{ textDecoration: 'underline' }}
                                    >
                                        {banner.path}
                                    </Typography>
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(banner.activate)}
                                </TableCell>
                                <TableCell align={'left'}>
                                    {getDate(banner.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BannersContainer;
