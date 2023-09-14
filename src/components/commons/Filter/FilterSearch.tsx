import { Box, SelectChangeEvent, TextField } from '@mui/material';
import React from 'react';
import Search from '../Search';

interface IFilterSearch {
    value: string | '';
    searchType: string;
    searchItems: any[];
    onChangeSearchInput: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSelectSearchType: (event: SelectChangeEvent<string>) => void;
}

const FilterSearch: React.FC<IFilterSearch> = ({
    value,
    searchType,
    searchItems,
    onChangeSearchInput,
    onSelectSearchType,
}) => {
    return (
        <Box>
            <Search
                value={searchType}
                searchItems={searchItems}
                onSelect={onSelectSearchType}
            />
            <TextField
                value={value}
                onChange={onChangeSearchInput}
                sx={{ marginLeft: '10px', width: '200px' }}
                placeholder={'내용을 입력해주세요.'}
            />
        </Box>
    );
};

export default FilterSearch;
