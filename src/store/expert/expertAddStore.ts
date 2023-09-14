import { create } from 'zustand';
import { ICreateUser } from '../../types/user';
import { ICategory, IMiddleCategory } from '../../types/category';
import { ICreateExpert } from '../../types/expert';

interface IExpertAddStore {
    expert: ICreateExpert;
    update: (newState: Partial<ICreateExpert>) => void;
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

export const useAddExpertStore = create<IExpertAddStore>((set) => ({
    expert: {
        uuid: '',
        name: '',
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
            expert: { ...state.expert, ...newState },
        })),
    setMiddleCategories: (categoryIndex, tempMiddleCategories) => {
        set((state) => ({
            expert: {
                ...state.expert,
                mainCategories: state.expert.mainCategories.map(
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
            expert: {
                ...state.expert,
                mainCategories: state.expert.mainCategories.map(
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
            const existingCategoryIndex = state.expert.mainCategories.findIndex(
                (item) => item.id === category.id
            );

            if (existingCategoryIndex !== -1) {
                const updatedMainCategories = [...state.expert.mainCategories];

                updatedMainCategories[existingCategoryIndex] = category;

                return {
                    wholesale: {
                        ...state.expert,
                        mainCategories: updatedMainCategories,
                    },
                };
            } else {
                // Add new category
                return {
                    expert: {
                        ...state.expert,
                        mainCategories: [
                            ...state.expert.mainCategories,
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
                expert: {
                    ...state.expert,
                    mainCategories: state.expert.mainCategories.filter(
                        (mainCategory, index) => index !== categoryIndex
                    ),
                },
            };
        });
    },
}));
