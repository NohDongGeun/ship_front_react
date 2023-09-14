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
import { PATH_EXPERTS } from '../../../constants/pathConstants';
import { IExpert } from '../../../types/expert';
import { useGetExperts } from '../../../hooks/useExperts';

interface IExpertsContainer {
    queryString: string;
}

const ExpertsContainer: React.FC<IExpertsContainer> = ({ queryString }) => {
    const router = useRouter();
    const experts = useGetExperts(queryString);
    const onClickRoute = useCallback((expertId: number, userId: number) => {
        router.push(`${PATH_EXPERTS}/${expertId}/edit?userUUId=${userId}`);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Name</TableCell>
                        {/* <TableCell align={'center'}>Store</TableCell> */}
                        <TableCell align={'center'}>Thumbnail</TableCell>
                        {/* <TableCell align={'center'}>Category</TableCell> */}
                        <TableCell align={'center'}>Career</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {experts.map((expert: IExpert) => {
                        return (
                            <TableRow
                                onClick={() =>
                                    onClickRoute(expert.id, expert.user!.uuid)
                                }
                                sx={{
                                    cursor: 'pointer',
                                }}
                                key={expert.id}
                            >
                                <TableCell align={'center'}>
                                    {expert.id}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {expert.name}
                                </TableCell>
                                {/* <TableCell align={'center'}>
                                        {expert.mark}
                                    </TableCell> */}
                                {/* <TableCell align={'center'}>
                                        {wholesale.categories}
                                    </TableCell> */}
                                <TableCell align={'center'}>
                                    <img
                                        src={expert.thumbnail}
                                        alt={''}
                                        width="100"
                                        height="100"
                                    />
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getCareer(expert.career)}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(expert.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(expert.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(ExpertsContainer);
