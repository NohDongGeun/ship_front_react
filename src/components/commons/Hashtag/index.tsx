import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import SubCategoryContainer from '../../../containers/category/add/SubCategoryContainer';
import { SubCategory, SubCategoryType } from '../../../models/SubCategory';

interface IHashtagView {
    newbieName: string;
    onChangeNewbieName: React.ChangeEventHandler<HTMLInputElement>;
    onAddHashtag: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}

const HashtagView: React.FC<IHashtagView> = ({
    newbieName,
    onChangeNewbieName,
    onAddHashtag,
    children,
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
                해쉬태그
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '20px',
                    }}
                >
                    <TextField
                        value={newbieName}
                        onChange={onChangeNewbieName}
                        sx={{ marginRight: '10px', width: '200px' }}
                    />
                    <Button onClick={onAddHashtag} variant={'contained'}>
                        추가
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {children}
                    {/* {subCategories.map((item, index) => (
                    <HashtagContainer
                        key={index}
                        subCategoryName={item.name}
                        subCategoryIndex={index}
                        onDeleteSubCategory={onDeleteSubCategory}
                        onSaveSubCategoryName={onSaveSubCategoryName}
                    />
                ))} */}
                </Box>
            </Box>
        </Box>
    );
};

export default HashtagView;
