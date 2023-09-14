import { Box, Button, SelectChangeEvent, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AddedWrapper from '../../../components/commons/AddedWrapper';
import ButtonSelectLabel from '../../../components/commons/ButtonSelectWithLabel';
import CheckBoxComponent from '../../../components/commons/CheckBox';
import ModalComponent from '../../../components/commons/Modal';
import {
    useGetMainCategories,
    useGetMainCategory,
} from '../../../hooks/useCategories';
import { useAddMarketStore } from '../../../store/market/marketAddStore';
import { IMiddleCategory } from '../../../types/category';

const queryString = 'page=1&limit=100&activate=true';

const MarketCategoriesContainer: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
    const mainCategories = useAddMarketStore(
        (state) => state.market.mainCategories
    );
    const setter = useAddMarketStore((state) => state.set);
    const setterMiddleCategories = useAddMarketStore(
        (state) => state.setMiddleCategories
    );
    const selectMiddleCategory = useAddMarketStore(
        (state) => state.selectMiddleCategory
    );
    const deleteCategory = useAddMarketStore((state) => state.deleteCategory);

    const currentMiddleCategories = useMemo<IMiddleCategory[]>(() => {
        if (!selectedCategoryId || selectedCategoryId <= 0) {
            return [];
        }

        const middleCategory = mainCategories.find(
            (item) => item.id === selectedCategoryId
        )?.middleCategories;

        if (middleCategory) {
            return middleCategory;
        } else {
            return [];
        }
    }, [mainCategories, selectedCategoryId]);

    const categoriesData = useGetMainCategories(queryString);
    const categoryData = useGetMainCategory(`${selectedCategoryId}`);

    useEffect(() => {
        if (categoriesData) {
            setter({
                mainCategories: categoriesData,
            });
        }
    }, []);

    useEffect(() => {
        if (categoryData && selectedCategoryId && selectedCategoryId > 0) {
            const categoryIndex = mainCategories.findIndex(
                (item) => item.id === selectedCategoryId
            );

            setterMiddleCategories(
                categoryIndex,
                categoryData.middleCategories
            );
        }
    }, [categoryData, selectedCategoryId]);

    const onClickSave = useCallback(() => {
        if (selectedCategoryId < 0) {
            return;
        }
        setIsOpen(true);
    }, [selectedCategoryId]);

    const onClickClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onSelect = useCallback((e: SelectChangeEvent<any>) => {
        const value = e.target.value;
        setSelectedCategoryId(value);
    }, []);

    const handleCheckboxChange = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement>,
            categoryId: number,
            isChecked: boolean
        ) => {
            const value = e.target.value;
            const middleCategory = currentMiddleCategories.find(
                (item) => item.id === +value
            );

            if (!middleCategory) return;

            const mainCategoryIndex = mainCategories.findIndex(
                (item) => item.id === categoryId
            );

            if (mainCategoryIndex < 0) return;

            const mainCategory = mainCategories[mainCategoryIndex];

            if (!mainCategory) return;

            const middleCategoryIndex = mainCategory.middleCategories.findIndex(
                (item) => item.id === +value
            );

            if (middleCategoryIndex < 0) return;

            selectMiddleCategory(
                mainCategoryIndex,
                middleCategoryIndex,
                isChecked
            );
        },
        [mainCategories, currentMiddleCategories]
    );

    const onClickDeleteCategory = useCallback(
        (categoryIndex: number) => {
            deleteCategory(categoryIndex);
        },
        [deleteCategory]
    );

    return (
        <>
            <ButtonSelectLabel
                value={selectedCategoryId}
                label={'카테고리 선택'}
                onClickSave={onClickSave}
                selectItem={categoriesData}
                onSelect={onSelect}
            />
            <ModalComponent
                title={'소 카테고리 선택'}
                onClose={onClickClose}
                open={isOpen}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    {currentMiddleCategories &&
                        currentMiddleCategories.map((item, index) => (
                            <CheckBoxComponent
                                key={item.id}
                                value={`${item.id}`}
                                htmlFor={`mc_${item.id}`}
                                label={item.name}
                                isChecked={
                                    item.isSelect ? item.isSelect : false
                                }
                                categoryId={selectedCategoryId}
                                onHandleCheckbox={handleCheckboxChange}
                            />
                        ))}
                </Box>
            </ModalComponent>
            {mainCategories && (
                <AddedWrapper>
                    {mainCategories.map((item, index) => {
                        if (
                            item.middleCategories &&
                            item.middleCategories.some((e) => e.isSelect)
                        ) {
                            let mCategoriesString = '';
                            item.middleCategories.map((mitem) => {
                                if (mitem.isSelect) {
                                    mCategoriesString = `${mCategoriesString}  ${mitem.name}`;
                                }
                            });
                            return (
                                <Box
                                    key={item.id}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Box sx={{ marginRight: '20px' }}>
                                            {item.name}
                                        </Box>
                                        <Box>
                                            <Typography
                                                sx={{ color: '#BFBFBF' }}
                                            >
                                                {mCategoriesString}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button
                                        onClick={() =>
                                            onClickDeleteCategory(index)
                                        }
                                        color="error"
                                    >
                                        삭제
                                    </Button>
                                </Box>
                            );
                        } else {
                            return <Box key={index}></Box>;
                        }
                    })}
                </AddedWrapper>
            )}
        </>
    );
};

export default React.memo(MarketCategoriesContainer);
