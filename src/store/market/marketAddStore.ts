import { create } from 'zustand';
import { ICategory, IMiddleCategory } from '../../types/category';
import { IIdObject, IMarketAdd } from '../../types/market';

interface IMarketAddStore {
    market: IMarketAdd;
    set: (newState: Partial<IMarketAddStore['market']>) => void;
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

export const useAddMarketStore = create<IMarketAddStore>((set) => ({
    market: {
        id: 0,
        name: '',
        thumbnail: null,
        imageFiles: [],
        contents: '',
        address: '',
        latitude: 0,
        longitude: 0,
        activate: false,
        createdDateTime: '',
        lastModifiedDateTime: '',
        mainCategories: [],
    },
    categories: [],
    set: (newState) =>
        set((state) => ({ market: { ...state.market, ...newState } })),
    setMiddleCategories: (categoryIndex, tempMiddleCategories) => {
        set((state) => ({
            market: {
                ...state.market,
                mainCategories: state.market.mainCategories.map(
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
            market: {
                ...state.market,
                mainCategories: state.market.mainCategories.map(
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
            const existingCategoryIndex = state.market.mainCategories.findIndex(
                (item) => item.id === category.id
            );

            if (existingCategoryIndex !== -1) {
                const updatedMainCategories = [...state.market.mainCategories];

                updatedMainCategories[existingCategoryIndex] = category;

                return {
                    market: {
                        ...state.market,
                        mainCategories: updatedMainCategories,
                    },
                };
            } else {
                // Add new category
                return {
                    market: {
                        ...state.market,
                        mainCategories: [
                            ...state.market.mainCategories,
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
                market: {
                    ...state.market,
                    mainCategories: state.market.mainCategories.map(
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
