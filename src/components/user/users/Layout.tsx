import React from 'react';
import { PATH_USERS_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import FilterContainer from '../../../containers/user/users/FilterContainer';
import UsersContainer from '../../../containers/user/users/UsersContainer';
import { useGetUsersCount } from '../../../hooks/useUsers';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'유저 목록'}
            addHref={PATH_USERS_ADD}
            addLabel={'유저 추가'}
        >
            <FilterContainer />
            <UsersContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetUsersCount}
            />
        </ListView>
    );
};

export default Layout;
