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
import { IUser } from '../../../types/user';
import { useRouter } from 'next/router';
import { PATH_USERS } from '../../../constants/pathConstants';
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { useGetUsers } from '../../../hooks/useUsers';

interface IUsersContainer {
    queryString: string;
}

const UsersContainer: React.FC<IUsersContainer> = ({ queryString }) => {
    const router = useRouter();
    const users = useGetUsers(queryString);
    const onClickMoveEditPage = (id: string) => {
        router.push(`${PATH_USERS}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>UUID</TableCell>
                        <TableCell align={'center'}>Name</TableCell>
                        <TableCell align={'center'}>Email</TableCell>
                        <TableCell align={'center'}>Phone</TableCell>
                        {/* <TableCell align={'center'}>Image</TableCell> */}
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user: IUser) => {
                        return (
                            <TableRow
                                key={user.id}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => onClickMoveEditPage(user.uuid!)}
                            >
                                <TableCell align={'center'}>
                                    {user.id}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {user.name}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {user.identyKey}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {user.phone}
                                </TableCell>
                                {/* <TableCell align={'center'}>
                                    <img
                                        src={user.image}
                                        alt={''}
                                        width="100"
                                        height="100"
                                    />
                                </TableCell> */}
                                <TableCell align={'center'}>
                                    {getStatus(user.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(user.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersContainer;
