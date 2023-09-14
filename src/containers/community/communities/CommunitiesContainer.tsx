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
import { PATH_COMMUNITIES, PATH_USERS } from '../../../constants/pathConstants';
import { ICommunity } from '../../../types/community';
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { useGetCommunities } from '../../../hooks/useCommunities';

interface ICommunitiesContainer {
    queryString: string;
}

const CommunitiesContainer: React.FC<ICommunitiesContainer> = ({
    queryString,
}) => {
    const router = useRouter();
    const communities = useGetCommunities(queryString);

    const onClickMoveUserEdit = (id: string) => {
        router.push(`${PATH_USERS}/${id}/edit`);
    };

    const onClickMoveEditPage = (id: number) => {
        router.push(`${PATH_COMMUNITIES}/${id}/edit`);
    };

    return (
        <TableContainer
            component={Paper}
            style={{
                maxWidth: '100%',
                overflowX: 'auto',
                boxSizing: 'border-box',
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>ID</TableCell>
                        <TableCell align={'center'}>Author</TableCell>
                        <TableCell align={'center'}>Title</TableCell>
                        <TableCell align={'center'}>Community Status</TableCell>
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {communities.map((community: ICommunity) => {
                        return (
                            <TableRow key={community.id}>
                                <TableCell
                                    align={'center'}
                                    onClick={() =>
                                        onClickMoveEditPage(community.id)
                                    }
                                    sx={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    {community.id}
                                </TableCell>
                                <TableCell
                                    align={'center'}
                                    onClick={() =>
                                        onClickMoveUserEdit(
                                            community.authorUUID
                                        )
                                    }
                                    sx={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    {community.authorUUID}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {community.title}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {community.status}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {getStatus(community.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(community.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CommunitiesContainer;
