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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PATH_FAQS } from '../../../constants/pathConstants';
import { IFaq } from '../../../types/faq';
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { useGetFaqs } from '../../../hooks/useFaqs';

interface IFaqsContainer {
    queryString: string;
}

const FaqsContainer: React.FC<IFaqsContainer> = ({ queryString }) => {
    const session = useSession();
    const router = useRouter();
    const faqs = useGetFaqs(queryString);

    const onClickMoveEditPage = (id: number) => {
        router.push(`${PATH_FAQS}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Title</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {faqs.map((faq: IFaq) => {
                        return (
                            <TableRow
                                key={faq.id}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => onClickMoveEditPage(faq.id)}
                            >
                                <TableCell align={'center'}>{faq.id}</TableCell>
                                <TableCell align={'center'}>
                                    {faq.title}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(faq.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(faq.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FaqsContainer;
