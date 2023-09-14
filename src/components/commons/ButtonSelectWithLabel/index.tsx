import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import React from 'react';

interface IButtonSelectLabel {
    value: number;
    label: string;
    selectItem: any[];
    onSelect: (e: SelectChangeEvent<any>) => void;
    onClickSave: () => void;
}

const ButtonSelectLabel: React.FC<IButtonSelectLabel> = ({
    value,
    label,
    selectItem,
    onClickSave,
    onSelect,
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
            {selectItem && (
                <FormControl sx={{ minWidth: 80 }}>
                    <Select
                        value={`${value}`}
                        onChange={onSelect}
                        autoWidth
                        label="Age"
                    >
                        {selectItem.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <Button
                variant={'contained'}
                sx={{ marginLeft: '10px' }}
                onClick={onClickSave}
            >
                추가
            </Button>
        </Box>
    );
};

export default ButtonSelectLabel;
