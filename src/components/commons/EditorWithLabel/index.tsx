import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface IEditorWithLabel {
    children: React.ReactNode;
    onSaveContents: () => void;
}

const EditorWithLabel: React.FC<IEditorWithLabel> = ({
    children,
    onSaveContents,
}) => {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '500px',
                    display: 'flex',
                    padding: '10px',
                    marginTop: '10px',
                    '& > div': {
                        width: '100%',
                    },
                }}
            >
                {children}
            </Box>
            <Button
                variant={'outlined'}
                sx={{ justifySelf: 'flex-end' }}
                onClick={onSaveContents}
            >
                save
            </Button>
        </>
    );
};

export default EditorWithLabel;
