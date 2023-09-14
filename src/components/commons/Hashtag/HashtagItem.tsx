import { Box, Button, TextField } from '@mui/material';
import React from 'react';

interface IHashtagItem {
    isEditing: boolean;
    newbieName: string;
    oldbieName: string;
    onClickEdit: React.MouseEventHandler<HTMLButtonElement>;
    onClickCancel: React.MouseEventHandler<HTMLButtonElement>;
    onChangeNewbieName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickSave: React.MouseEventHandler<HTMLButtonElement>;
    onClickDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const HashtagItem: React.FC<IHashtagItem> = ({
    isEditing,
    newbieName,
    oldbieName,
    onClickEdit,
    onClickCancel,
    onChangeNewbieName,
    onClickSave,
    onClickDelete,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #9E9EA7',
                '&:last-child': {
                    borderBottom: 'none',
                },
            }}
        >
            {isEditing ? (
                <TextField
                    value={newbieName}
                    onChange={onChangeNewbieName}
                    sx={{ marginRight: '10px', width: '190px' }}
                />
            ) : (
                <Box sx={{ marginRight: '10px', width: '190px' }}>
                    {oldbieName}
                </Box>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {isEditing ? (
                    <>
                        <Button onClick={onClickSave}>save</Button>
                        <Button onClick={onClickCancel} color={'error'}>
                            cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={onClickEdit}>edit</Button>
                        <Button onClick={onClickDelete} color={'error'}>
                            delete
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default HashtagItem;
