import { create } from 'zustand';
import { ICategory, IMiddleCategory } from '../../types/category';
import { IMarketEdit } from '../../types/market';

interface IMarketEditStore {
    market: IMarketEdit;
    serverCategories: ICategory[];
    initMarket: (newState: IMarketEdit) => void;
    initServerCategories: (newState: ICategory[]) => void;
    updateMarket: (newState: Partial<IMarketEdit>) => void;
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

export const useEditMarketStore = create<IMarketEditStore>((set) => ({
    market: {
        id: 0,
        name: '',
        thumbnail: '',
        images: [],
        contents: '',
        address: '',
        latitude: 0,
        longitude: 0,
        activate: false,
        createdDateTime: '',
        lastModifiedDateTime: '',
        categories: [],
        imageFiles: [],
        thumbnailImageFile: null,
    },
    serverCategories: [],
    initMarket: (newState: IMarketEdit) =>
        set(() => ({
            market: newState,
        })),
    initServerCategories: (newState: ICategory[]) =>
        set(() => ({
            serverCategories: newState,
        })),
    updateMarket: (newState: Partial<IMarketEdit>) =>
        set((state) => ({
            market: { ...state.market, ...newState },
        })),
    setMiddleCategories: (categoryIndex, tempMiddleCategories) => {
        set((state) => ({
            market: {
                ...state.market,
                categories: state.market.categories.map((item, index) => {
                    if (index === categoryIndex) {
                        item.middleCategories = tempMiddleCategories;
                        return item;
                    }
                    return item;
                }),
            },
        }));
    },
    selectMiddleCategory: (categoryIndex, middleCategoryIndex, checked) => {
        set((state) => ({
            market: {
                ...state.market,
                categories: state.market.categories.map((main, index) => {
                    if (index === categoryIndex) {
                        const middleCategories = main.middleCategories.map(
                            (item, mIndex) => {
                                if (mIndex === middleCategoryIndex && checked) {
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
                }),
            },
        }));
    },
    selectCategory: (category) => {
        set((state) => {
            const existingCategoryIndex = state.market.categories.findIndex(
                (item) => item.id === category.id
            );

            if (existingCategoryIndex !== -1) {
                const updatedMainCategories = [...state.market.categories];

                updatedMainCategories[existingCategoryIndex] = category;

                return {
                    market: {
                        ...state.market,
                        categories: updatedMainCategories,
                    },
                };
            } else {
                // Add new category
                return {
                    market: {
                        ...state.market,
                        categories: [...state.market.categories, category],
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
                    categories: state.market.categories.map(
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
