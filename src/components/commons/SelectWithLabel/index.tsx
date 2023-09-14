import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import React from 'react';

interface ISelectWithLabel {
    label: string;
    value: string;
    searchItems: any[];
    readOnly?: boolean;
    onSelect: (e: SelectChangeEvent<string>) => void;
}

const SelectWithLabel: React.FC<ISelectWithLabel> = ({
    label,
    value,
    searchItems,
    onSelect,
    readOnly = false,
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                padding: '10px 20px',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Typography
                variant="body1"
                color="#9E9EA7"
                fontSize={'14px'}
                lineHeight={'36px'}
                sx={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: '180px',
                    marginRight: '20px',
                }}
            >
                {label}
            </Typography>
            <FormControl sx={{ minWidth: 80 }}>
                <Select
                    value={value}
                    onChange={onSelect}
                    inputProps={{ readOnly: readOnly }}
                    autoWidth
                >
                    {searchItems &&
                        searchItems.map((item: any, index: number) => (
                            <MenuItem key={item.id} value={item.value}>
                                {item.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectWithLabel;
