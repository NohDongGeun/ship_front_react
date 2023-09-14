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
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { PATH_QNAS, PATH_USERS } from '../../../constants/pathConstants';
import { IQna } from '../../../types/qna';
import {
    getDate,
    getQnaStatus,
    getStatus,
} from '../../../utils/dataTransformUtils';
import { useGetQnas } from '../../../hooks/useQnas';

interface IFaqsContainer {
    queryString: string;
}

const QnasContainer: React.FC<IFaqsContainer> = ({ queryString }) => {
    const router = useRouter();
    const qnas = useGetQnas(queryString);
    const onClickMoveUserPage = (id: string) => {
        router.push(`${PATH_USERS}/${id}/edit`);
    };

    const onClickMoveEditPage = (id: number) => {
        router.push(`${PATH_QNAS}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Title</TableCell>
                        <TableCell align={'center'}>Author</TableCell>
                        <TableCell align={'center'}>QNA Status</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {qnas.map((qna: IQna) => {
                        return (
                            <TableRow key={qna.id}>
                                <TableCell
                                    align={'center'}
                                    onClick={() => onClickMoveEditPage(qna.id)}
                                >
                                    <Typography
                                        sx={{
                                            cursor: 'pointer',
                                            textDecorationLine: 'underline',
                                        }}
                                    >
                                        {' '}
                                        {qna.id}
                                    </Typography>
                                </TableCell>
                                <TableCell align={'center'}>
                                    {qna.title}
                                </TableCell>
                                <TableCell
                                    align={'center'}
                                    onClick={() =>
                                        onClickMoveUserPage(qna.authorUUID)
                                    }
                                >
                                    <Typography
                                        sx={{
                                            cursor: 'pointer',
                                            textDecorationLine: 'underline',
                                        }}
                                    >
                                        {qna.authorUUID}
                                    </Typography>
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getQnaStatus(qna.qnaStatus)}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(qna.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(qna.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(QnasContainer);
