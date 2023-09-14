import React from 'react';
import PaginationView from '../../components/commons/PaginationView';

interface IPaginationContainer {
    queryString: string;
    getCount: (queryString: string) => number;
}

const PaginationContainer: React.FC<IPaginationContainer> = ({
    queryString,
    getCount,
}) => {
    const count = getCount(queryString);

    if (!count) return <></>;

    return <PaginationView count={count} />;
};

export default React.memo(PaginationContainer);
