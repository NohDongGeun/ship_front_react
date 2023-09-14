import { useRouter } from 'next/router';
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
import { PATH_ADMINS } from '../../../constants/pathConstants';
import { getDate, getStatus } from '../../../utils/dataTransformUtils';
import { IAdmin } from '../../../types/admin';
import { useGetAdmins } from '../../../hooks/useAdmins';

interface IAdminContainer {
    queryString: string;
}

const AdminsContainer: React.FC<IAdminContainer> = ({ queryString }) => {
    const router = useRouter();
    const admins = useGetAdmins(queryString);

    const onClickMoveEditPage = (id: string) => {
        router.push(`${PATH_ADMINS}/${id}/edit`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* <TableCell align={'center'}>UUID</TableCell> */}
                        <TableCell align={'center'}>Name</TableCell>
                        <TableCell align={'center'}>Email</TableCell>
                        <TableCell align={'center'}>Phone</TableCell>
                        {/* <TableCell align={'center'}>Image</TableCell> */}
                        <TableCell align={'center'}>Status</TableCell>
                        <TableCell align={'left'}>CreatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {admins.map((admin: IAdmin) => {
                        return (
                            <TableRow
                                key={admin.id}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => onClickMoveEditPage(admin.uuid!)}
                            >
                                {/* <TableCell align={'center'}>
                                    {admin.id}
                                </TableCell> */}
                                <TableCell align={'center'}>
                                    {admin.name}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {admin.identyKey}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {admin.phone}
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
                                    {getStatus(admin.activate)}
                                </TableCell>

                                <TableCell align={'left'}>
                                    {getDate(admin.createdDateTime)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminsContainer;
