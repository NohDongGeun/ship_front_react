import { create } from 'zustand';
import { ICreateUser } from '../../types/user';
import { ICategory, IMiddleCategory } from '../../types/category';
import { ICreateWholesale } from '../../types/wholesale';

interface IWholesaleAddStore {
    wholesale: ICreateWholesale;
    update: (newState: Partial<ICreateWholesale>) => void;
    selectCategory: (category: ICategory) => void;
    setMiddleCategories: (
        categoryIndex: number,
        middleCategories: IMiddleCategory[]
    ) => void;
    selectMiddleCategory: (
        categoryIndex: number,
        middleCategoryIndex: number,
        checked: boolean
    ) => void;
    deleteCategory: (categoryIndex: number) => void;
}

export const useAddWholesaleStore = create<IWholesaleAddStore>((set) => ({
    wholesale: {
        uuid: '',
        name: '',
        storeName: '',
        imageFiles: [],
        thumbnail: null,
        businessNumber: '',
        address: '',
        latitude: 0,
        longitude: 0,
        marketId: 0,
        career: '',
        profile: '',
        activate: false,
        content: '',
        mainCategories: [],
    },
    update: (newState: Partial<ICreateUser>) =>
        set((state) => ({
            wholesale: { ...state.wholesale, ...newState },
        })),
    setMiddleCategories: (categoryIndex, tempMiddleCategories) => {
        set((state) => ({
            wholesale: {
                ...state.wholesale,
                mainCategories: state.wholesale.mainCategories.map(
                    (item, index) => {
                        if (index === categoryIndex) {
                            item.middleCategories = tempMiddleCategories;
                            return item;
                        }
                        return item;
                    }
                ),
            },
        }));
    },
    selectMiddleCategory: (categoryIndex, middleCategoryIndex, checked) => {
        set((state) => ({
            wholesale: {
                ...state.wholesale,
                mainCategories: state.wholesale.mainCategories.map(
                    (main, index) => {
                        if (index === categoryIndex) {
                            const middleCategories = main.middleCategories.map(
                                (item, mIndex) => {
                                    if (
                                        mIndex === middleCategoryIndex &&
                                        checked
                                    ) {
                                        item.isSelect = false;
                                    } else if (
                                        mIndex === middleCategoryIndex &&
                                        !checked
                                    ) {
                                        item.isSelect = true;
                                    }

                                    return item;
                                }
                            );

                            main.middleCategories = middleCategories;

                            return main;
                        }
                        return main;
                    }
                ),
            },
        }));
    },
    selectCategory: (category) => {
        set((state) => {
            const existingCategoryIndex = state.wholesale.mainCategories.findIndex(
                (item) => item.id === category.id
            );

            if (existingCategoryIndex !== -1) {
                const updatedMainCategories = [
                    ...state.wholesale.mainCategories,
                ];

                updatedMainCategories[existingCategoryIndex] = category;

                return {
                    wholesale: {
                        ...state.wholesale,
                        mainCategories: updatedMainCategories,
                    },
                };
            } else {
                // Add new category
                return {
                    wholesale: {
                        ...state.wholesale,
                        mainCategories: [
                            ...state.wholesale.mainCategories,
                            category,
                        ],
                    },
                };
            }
        });
    },
    deleteCategory: (categoryIndex) => {
        set((state) => {
            return {
                wholesale: {
                    ...state.wholesale,
                    mainCategories: state.wholesale.mainCategories.map(
                        (mainCategory, index) => {
                            if (index === categoryIndex) {
                                return {
                                    ...mainCategory,
                                    middleCategories: mainCategory.middleCategories.map(
                                        (middleCategory) => {
                                            return {
                                                ...middleCategory,
                                                isSelect: false,
                                            };
                                        }
                                    ),
                                };
                            } else {
                                return mainCategory;
                            }
                        }
                    ),
                },
            };
        });
    },
}));
