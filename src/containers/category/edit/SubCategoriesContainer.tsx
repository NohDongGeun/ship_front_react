import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import ModalComponent from '../../../components/commons/Modal';
import { ACTIVATE_LIST } from '../../../constants/listConstants';
import { useEditCategoryStore } from '../../../store/mainCategory/categoryEditStore';
import { IMiddleCategory } from '../../../types/category';
import { getStatus } from '../../../utils/dataTransformUtils';

const DEFAULT_MIDDLE_CATEGORY: IMiddleCategory = {
    id: 0,
    name: '',
    activate: false,
};

const SubCategoriesContainer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // 모달 창 오픈 여부
    const [selectedMiddleCategory, setSelectedMiddleCategory] = useState<
        IMiddleCategory
    >(DEFAULT_MIDDLE_CATEGORY); // 선택한 미들 카테고리
    const selectTypeRef = useRef(''); // add or edit or ''
    const selectedMiddleCategoryIndexRef = useRef(0);

    const middleCategories = useEditCategoryStore(
        (state) => state.category.middleCategories
    );
    const addMiddleCategories = useEditCategoryStore(
        (state) => state.addMiddleCategories
    );
    const editMiddleCategories = useEditCategoryStore(
        (state) => state.editMiddleCategories
    );
    const deleteMiddleCategories = useEditCategoryStore(
        (state) => state.deleteMiddleCategories
    );

    const onClickAddMiddleCategory = useCallback(() => {
        setIsOpen(true);
        selectTypeRef.current = 'add';
    }, []);

    const onConfirmMiddleCategoryModal = useCallback(
        (middleCategoryId: number) => {
            if (selectTypeRef.current === 'add') {
                // 미들 카테고리 새로 추가
                addMiddleCategories(selectedMiddleCategory);
            } else if (selectTypeRef.current === 'edit') {
                // 미들 카테고리 수정
                editMiddleCategories(
                    selectedMiddleCategoryIndexRef.current,
                    selectedMiddleCategory
                );
            }

            selectTypeRef.current = '';
            setSelectedMiddleCategory(DEFAULT_MIDDLE_CATEGORY);
            setIsOpen(false);
        },
        [selectedMiddleCategory, middleCategories]
    );

    const onCancelMiddleCatagoryModal = useCallback(() => {
        setIsOpen(false);
        selectTypeRef.current = '';
        selectedMiddleCategoryIndexRef.current = 0;
        setSelectedMiddleCategory(DEFAULT_MIDDLE_CATEGORY);
    }, []);

    const onChangeMiddleCategoryActivate = useCallback(
        (e: SelectChangeEvent<string>) => {
            const value = e.target.value;

            setSelectedMiddleCategory((prev) => ({
                ...prev,
                activate: value === 'true',
            }));
        },
        []
    );

    const onChangeMiddleCategoryName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            setSelectedMiddleCategory((prev) => ({
                ...prev,
                name: value,
            }));
        },
        []
    );

    const onClickEditButton = useCallback(
        (middleCategory: IMiddleCategory, middleCategoryIndex: number) => {
            selectTypeRef.current = 'edit';
            selectedMiddleCategoryIndexRef.current = middleCategoryIndex;
            setIsOpen(true);
            setSelectedMiddleCategory(middleCategory);
        },
        []
    );

    const onClickDelete = useCallback((index: number) => {
        deleteMiddleCategories(index);
    }, []);

    return (
        <>
            <Button
                sx={{ marginBottom: '10px' }}
                variant="contained"
                onClick={() => onClickAddMiddleCategory()}
            >
                소 카테고리 추가
            </Button>
            <ModalComponent
                title={'소 카테고리'}
                open={isOpen}
                onClose={onCancelMiddleCatagoryModal}
                onHandleConfirm={() =>
                    onConfirmMiddleCategoryModal(
                        selectedMiddleCategory.id
                            ? selectedMiddleCategory.id
                            : 0
                    )
                }
            >
                {selectedMiddleCategory && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
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
                                fontSize={'15px'}
                                lineHeight={'36px'}
                                sx={{
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    flexBasis: '70px',
                                    marginRight: '20px',
                                }}
                            >
                                이름
                            </Typography>
                            <TextField
                                variant="outlined"
                                type={'text'}
                                sx={{
                                    borderRadius: '4px',
                                    backgroundColor: '#fff',
                                    flex: 1,
                                }}
                                value={selectedMiddleCategory.name}
                                onChange={onChangeMiddleCategoryName}
                            />
                        </Box>
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
                                fontSize={'15px'}
                                lineHeight={'36px'}
                                sx={{
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    flexBasis: '70px',
                                    marginRight: '20px',
                                }}
                            >
                                상태
                            </Typography>
                            <FormControl
                                sx={{ display: 'flex', minWidth: 80, flex: 1 }}
                            >
                                <Select
                                    sx={{ width: '100%', textAlign: 'center' }}
                                    value={`${selectedMiddleCategory.activate}`}
                                    onChange={onChangeMiddleCategoryActivate}
                                >
                                    {ACTIVATE_LIST.map((item) => (
                                        <MenuItem
                                            sx={{ width: '100%' }}
                                            key={item.id}
                                            value={item.value}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                )}
            </ModalComponent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {middleCategories.map(
                    (middleCategory: IMiddleCategory, index) => (
                        <>
                            <Box
                                key={`${middleCategory.id}_${index}`}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderBottom: '1px solid black',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: '200px',
                                            fontSize: '18px',
                                            marginLeft: '10px',
                                            marginRight: '50px',
                                        }}
                                    >
                                        {middleCategory.name}
                                    </Typography>
                                    <Typography
                                        color={
                                            middleCategory.activate
                                                ? 'blue'
                                                : 'red'
                                        }
                                    >
                                        {getStatus(middleCategory.activate)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button
                                        onClick={() =>
                                            onClickEditButton(
                                                middleCategory,
                                                index
                                            )
                                        }
                                    >
                                        EDIT
                                    </Button>
                                    <Button
                                        color={'error'}
                                        sx={{ marginRight: '10px' }}
                                        onClick={() => onClickDelete(index)}
                                    >
                                        DELETE
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    )
                )}
            </Box>
        </>
    );
};

export default React.memo(SubCategoriesContainer);
