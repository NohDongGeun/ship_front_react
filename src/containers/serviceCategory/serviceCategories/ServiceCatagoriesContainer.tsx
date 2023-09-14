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
import { PATH_SERVICE_CATEGORIES } from '../../../constants/pathConstants';
import { IServiceCategory } from '../../../types/serviceCategory';
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { useGetServiceCategories } from '../../../hooks/useServiceCategories';

interface IServiceCategoriesContainer {
    queryString: string;
}

const ServiceCategoriesContainer: React.FC<IServiceCategoriesContainer> = ({
    queryString,
}) => {
    const session = useSession();
    const router = useRouter();
    const serviceCategories = useGetServiceCategories(queryString);

    const onClickMoveEditPage = (id: number) => {
        router.push(`${PATH_SERVICE_CATEGORIES}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Name</TableCell>
                        <TableCell align={'center'}>Type</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serviceCategories.map((category: IServiceCategory) => {
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
                                    {category.type}
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

export default React.memo(ServiceCategoriesContainer);
