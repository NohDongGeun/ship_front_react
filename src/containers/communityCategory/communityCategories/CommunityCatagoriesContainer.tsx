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
import { IServiceCategory } from '../../../types/serviceCategory';
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { PATH_COMMUNITY_CATEGORIES } from '../../../constants/pathConstants';
import { useGetCommunityCategories } from '../../../hooks/useCommunityCategories';

interface ICommunityCategoriesContainer {
    queryString: string;
}

const CommunityCategoriesContainer: React.FC<ICommunityCategoriesContainer> = ({
    queryString,
}) => {
    const router = useRouter();
    const communityCategories = useGetCommunityCategories(queryString);
    const onClickMoveEditPage = (id: number) => {
        router.push(`${PATH_COMMUNITY_CATEGORIES}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Name</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {communityCategories.map((category: IServiceCategory) => {
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

export default React.memo(CommunityCategoriesContainer);
