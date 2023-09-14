import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import SubCategoryContainer from '../../../containers/category/add/SubCategoryContainer';
import { SubCategory, SubCategoryType } from '../../../models/SubCategory';
import { IMiddleCategory } from '../../../types/category';

interface ISubCategoryView {
    newbieName: string;
    subCategories: IMiddleCategory[];
    onChangeNewbieName: React.ChangeEventHandler<HTMLInputElement>;
    onAddSubCategory: React.MouseEventHandler<HTMLButtonElement>;
    onDeleteSubCategory: (index: number) => void;
    onSaveSubCategoryName: (index: number, name: string) => void;
}

const SubCategoryView: React.FC<ISubCategoryView> = ({
    newbieName,
    subCategories,
    onChangeNewbieName,
    onAddSubCategory,
    onDeleteSubCategory,
    onSaveSubCategoryName,
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '0 20px',
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
                <Button onClick={onAddSubCategory} variant={'contained'}>
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
                {subCategories.map((item, index) => (
                    <SubCategoryContainer
                        key={index}
                        subCategoryName={item.name}
                        subCategoryIndex={index}
                        onDeleteSubCategory={onDeleteSubCategory}
                        onSaveSubCategoryName={onSaveSubCategoryName}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default SubCategoryView;
