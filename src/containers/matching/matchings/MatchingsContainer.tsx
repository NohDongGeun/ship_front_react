// src/components/BannerTable.tsx
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
import { useRouter } from 'next/router';
import { IMatching } from '../../../types/matching';
import {
    getDate,
    getMatchingStatus,
    getStatus,
} from '../../../utils/dataTransformUtils';
import { PATH_MATCHINGS } from '../../../constants/pathConstants';
import { useGetMatchings } from '../../../hooks/useMatchings';

interface IMatchingsContainer {
    queryString: string;
}

const MatchingsContainer: React.FC<IMatchingsContainer> = ({ queryString }) => {
    const router = useRouter();
    const matchings = useGetMatchings(queryString);

    const onClickMoveEditPage = (id: number) => {
        router.push(`${PATH_MATCHINGS}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>전문가</TableCell>
                        <TableCell align={'center'}>요청자</TableCell>
                        <TableCell align={'center'}>매칭 상태</TableCell>
                        <TableCell align={'center'}>상태</TableCell>
                        <TableCell align={'left'}>생성일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matchings.map((matching: IMatching) => {
                        return (
                            <TableRow
                                key={matching.id}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => onClickMoveEditPage(matching.id)}
                            >
                                <TableCell align={'center'}>
                                    {matching.id}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {matching.expert.name}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {matching.application.name}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getMatchingStatus(matching.matchingStatus)}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(matching.activate)}
                                </TableCell>
                                <TableCell align={'left'}>
                                    {getDate(matching.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(MatchingsContainer);
