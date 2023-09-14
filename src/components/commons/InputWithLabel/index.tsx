import { Box, TextField, Typography, TextareaAutosize } from '@mui/material';
import React from 'react';

interface IInputWithLabel {
    label: string;
    value: string | '';
    readonly?: boolean;
    multiline?: boolean;
    inputType?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const InputWithLabel: React.FC<IInputWithLabel> = ({
    label,
    value,
    readonly = false,
    multiline = false,
    inputType = 'text',
    onChange,
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
            {multiline ? (
                <TextareaAutosize
                    minRows={4}
                    maxRows={Infinity}
                    style={{
                        padding: '5px',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        flex: 1,
                    }}
                    value={value}
                    onChange={onChange ? onChange : (e) => {}}
                />
            ) : (
                <TextField
                    variant="outlined"
                    type={inputType}
                    sx={{
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        flex: 1,
                    }}
                    value={value}
                    InputProps={{
                        readOnly: readonly,
                    }}
                    onChange={onChange ? onChange : (e) => {}}
                />
            )}
        </Box>
    );
};

export default InputWithLabel;
