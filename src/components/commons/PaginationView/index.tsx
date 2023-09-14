import { Box, Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ChangeEvent } from 'react';

interface IPaginationView {
    count: number;
}

const PaginationView: React.FC<IPaginationView> = ({ count }) => {
    const router = useRouter();
    const page = Number(router.query.page) || 1;

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: value },
        });
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40px',
            }}
        >
            <Pagination
                count={count}
                page={page}
                color="primary"
                shape="rounded"
                onChange={handlePageChange}
            />
        </Box>
    );
};

export default PaginationView;
