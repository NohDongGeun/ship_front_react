import { Box, Button, SelectChangeEvent, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import AddedWrapper from '../../../components/commons/AddedWrapper';
import ButtonSelectLabel from '../../../components/commons/ButtonSelectWithLabel';
import CheckBoxComponent from '../../../components/commons/CheckBox';
import ModalComponent from '../../../components/commons/Modal';
import {
    useGetMainCategories,
    useGetMainCategory,
} from '../../../hooks/useCategories';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';
import { ICategory, IMiddleCategory } from '../../../types/category';
import { ICheckItem, ISearchItem } from '../../../types/searchItem';

const queryString = 'page=1&limit=100&activate=true';

const ExpertCategoriesContainer: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
    const categories = useEditExpertStore((state) => state.expert!.categories!); // 현재 스토어에 선택되어 있는 카테고리 목록
    const serverCategories = useGetMainCategories(queryString); // 서버에서 전달 받은 모든 카테고리 목록
    const selectServerCategory = useGetMainCategory(`${selectedCategoryId}`); // 선택한 카테고리 디테일
    const update = useEditExpertStore((state) => state.update);

    // 서버카테고리 search item list
    const serverCategoriesToSearchItems = useMemo(() => {
        if (!serverCategories) return [];

        return serverCategories.reduce((acc: ISearchItem[], crr: ICategory) => {
            return acc.concat({
                id: crr.id,
                name: crr.name,
                value: crr.id,
            });
        }, []);
    }, [serverCategories]);
    // 선택한 서버 카테고리의 미들 카테고리
    // 이미 선택되어 있는 것도 적용해줘야한다.
    const serverCategoryDetail = useMemo(() => {
        if (!categories || !selectServerCategory) return [];

        const serverMiddleCategories = selectServerCategory.middleCategories;
        const middleCategories = categories.find(
            (item) => item.id === selectServerCategory.id
        )?.middleCategories;
        return serverMiddleCategories.reduce(
            (acc: ICheckItem[], crr: IMiddleCategory) => {
                const isChecked = middleCategories
                    ? middleCategories.some((item) => item.id === crr.id)
                    : false;

                if (crr.id) {
                    return acc.concat({
                        id: crr.id,
                        name: crr.name,
                        value: `${crr.id}`,
                        isChecked: isChecked,
                    });
                }
            },
            []
        );
    }, [serverCategories, categories, selectServerCategory]);
    // 추가 버튼 클릭
    const onClickCategorySelectButton = useCallback(() => {
        if (selectedCategoryId === 0) return;

        setIsOpen(true);
    }, [selectedCategoryId]);

    const onClickCloseModal = useCallback(() => {
        setIsOpen(false);
        setSelectedCategoryId(0);
    }, []);

    //메인 카테고리 선택
    const onClickSelectMainCategory = useCallback(
        (e: SelectChangeEvent<any>) => {
            const value = e.target.value;
            if (!value || isNaN(value)) return;

            setSelectedCategoryId(value);
        },
        []
    );

    // 미들 카테고리 선택
    // 첫 선택은 스토어 미들 카테고리에 저장 해준다
    // 만약 스토어의 미들카테고리에 해당 미들 카테고리가 존재하면 삭제 한다.
    const onCheckMiddleCategory = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement>,
            categoryId: number,
            isChecked: boolean
        ) => {
            const middleCategoryId = +e.target.value;
            const selectedMiddleCategory = selectServerCategory.middleCategories.find(
                (item: IMiddleCategory) => item.id === middleCategoryId
            );

            const storeCategoryIndex = categories.findIndex(
                (item) => item.id === +categoryId
            );

            if (storeCategoryIndex === -1) {
                // 선택한 메인카테고리가 없으면 메인 카테고리랑 미들카테고리 같이 넣어준다

                if (selectedMiddleCategory) {
                    const tempCategory: ICategory = {
                        ...selectServerCategory,
                        middleCategories: [selectedMiddleCategory],
                    };
                    const tempCategories = [...categories, tempCategory];

                    update({
                        categories: tempCategories,
                    });
                } else {
                    return;
                }
            } else {
                const storeMiddleCategoryIndex = categories[
                    storeCategoryIndex
                ].middleCategories.findIndex(
                    (item) => item.id === middleCategoryId
                );

                if (storeMiddleCategoryIndex === -1) {
                    // 메인카테고리가 있고 미들 카테고리가 없으면 미들 카테고리를 넣어준다
                    const tempStoreCategories = categories.map(
                        (item: ICategory, index) => {
                            if (index === storeCategoryIndex) {
                                return {
                                    ...item,
                                    middleCategories: [
                                        ...item.middleCategories,
                                        selectedMiddleCategory,
                                    ],
                                };
                            }

                            return item;
                        }
                    );

                    update({ categories: tempStoreCategories });
                } else {
                    // 메인카테고리가 있고 미들 카테고리도 있으면 미들 카테고리를 지워준다, 이때 메인 카테고리의 개수가 1 이면 메인 카테고리 자체를 지워준다.
                    if (
                        categories[storeCategoryIndex].middleCategories
                            .length === 1
                    ) {
                        // 미들 카테고리 개수가 1 개 이면 카테고리 까지 지우기
                        const tempStoreCategories = categories.filter(
                            (item: ICategory, index) =>
                                index !== storeCategoryIndex
                        );

                        update({ categories: tempStoreCategories });
                    } else {
                        // 미들 카테고리만 지우기

                        const tempStoreCategories = categories.map(
                            (item: ICategory, index) => {
                                if (index === storeCategoryIndex) {
                                    return {
                                        ...item,
                                        middleCategories: item.middleCategories.filter(
                                            (mItem: IMiddleCategory, index) =>
                                                index !==
                                                storeMiddleCategoryIndex
                                        ),
                                    };
                                }
                                return item;
                            }
                        );

                        update({ categories: tempStoreCategories });
                    }
                }
            }
        },
        [categories, selectServerCategory, serverCategories]
    );

    //스토어 카테고리 삭제
    const onClickDeleteCategory = useCallback(
        (index: number) => {
            const tempCategories: ICategory[] = categories.filter(
                (_, idx) => index !== idx
            );

            update({ categories: tempCategories });
        },
        [categories]
    );

    return (
        <>
            <ButtonSelectLabel
                value={selectedCategoryId}
                label={'카테고리 선택'}
                onClickSave={onClickCategorySelectButton}
                selectItem={serverCategoriesToSearchItems}
                onSelect={onClickSelectMainCategory}
            />
            <ModalComponent
                title={'소 카테고리 선택'}
                onClose={onClickCloseModal}
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
                    {serverCategoryDetail &&
                        serverCategoryDetail.map((item: ICheckItem) => (
                            <CheckBoxComponent
                                key={item.id}
                                value={`${item.id}`}
                                htmlFor={`mc_${item.id}`}
                                label={item.name}
                                isChecked={item.isChecked}
                                categoryId={selectedCategoryId}
                                onHandleCheckbox={onCheckMiddleCategory}
                            />
                        ))}
                </Box>
            </ModalComponent>
            {categories && (
                <AddedWrapper>
                    {categories.map((item: ICategory, index) => {
                        let mCategoriesString = '';
                        item.middleCategories.map((mitem) => {
                            mCategoriesString = `${mCategoriesString}  ${mitem.name}`;
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
                                        <Typography sx={{ color: '#BFBFBF' }}>
                                            {mCategoriesString}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button
                                    onClick={() => onClickDeleteCategory(index)}
                                    color="error"
                                >
                                    삭제
                                </Button>
                            </Box>
                        );
                    })}
                </AddedWrapper>
            )}
        </>
    );
};

export default React.memo(ExpertCategoriesContainer);
