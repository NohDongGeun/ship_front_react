import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import React from 'react';

interface ISearch {
    value: string;
    searchItems?: any[];
    onSelect: (event: SelectChangeEvent<string>) => void;
}

const Search: React.FC<ISearch> = ({ value, searchItems, onSelect }) => {
    return (
        <FormControl sx={{ minWidth: 80 }}>
            <Select value={value} onChange={onSelect} autoWidth displayEmpty>
                {searchItems &&
                    searchItems.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                            {item.name}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

export default Search;
