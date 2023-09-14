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
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { ICategory } from '../../../types/category';
import { useRouter } from 'next/router';
import { PATH_CATEGORIES } from '../../../constants/pathConstants';
import { useGetMainCategories } from '../../../hooks/useCategories';

interface ICategoriesContainer {
    queryString: string;
}

const CategoriesContainer: React.FC<ICategoriesContainer> = ({
    queryString,
}) => {
    const router = useRouter();
    const mainCategories = useGetMainCategories(queryString);

    const onClickMoveEditPage = (id: number) => {
        router.push(`${PATH_CATEGORIES}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Name</TableCell>
                        <TableCell align={'center'}>Icon</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mainCategories.map((category: ICategory) => {
                        return (
                            <TableRow
                                key={category.id}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => onClickMoveEditPage(category.id)}
                            >
                                <TableCell align={'center'}>
                                    {category.id}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {category.name}
                                </TableCell>
                                <TableCell align={'center'}>
                                    <img
                                        src={category.path}
                                        alt={''}
                                        width="100"
                                        height="100"
                                    />
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(category.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(category.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CategoriesContainer;
