import React from 'react';
import { PATH_ADMINS_ADD } from '../../../constants/pathConstants';
import AdminsContainer from '../../../containers/admin/admins/AdminsContainer';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import { useGetAdminsCount } from '../../../hooks/useAdmins';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'관리자 목록'}
            addHref={PATH_ADMINS_ADD}
            addLabel={'관리자 추가'}
        >
            <AdminsContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetAdminsCount}
            />
        </ListView>
    );
};

export default Layout;
