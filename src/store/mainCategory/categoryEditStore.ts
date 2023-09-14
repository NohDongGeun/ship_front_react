import { create } from 'zustand';
import { IImage } from '../../components/commons/MultiImageUpload';
import { ICategory, IMiddleCategory } from '../../types/category';

interface IEditCategoryStore {
    category: ICategory;
    init: (category: ICategory) => void;
    setName: (value: string) => void;
    setActivate: (value: boolean) => void;
    addMiddleCategories: (value: IMiddleCategory) => void;
    editMiddleCategories: (index: number, value: IMiddleCategory) => void;
    deleteMiddleCategories: (index: number) => void;
    setImageFile: (value: IImage) => void;
}

const category: ICategory = {
    id: 0,
    name: '',
    path: '',
    imageFile: null,
    activate: false,
    middleCategories: [],
    createdDateTime: '',
    lastModifiedDateTime: '',
};

export const useEditCategoryStore = create<IEditCategoryStore>()((set) => ({
    category: category,
    init: (category: ICategory) =>
        set((state) => ({
            category: { ...category },
        })),
    setName: (value: string) =>
        set((state) => ({ category: { ...state.category, name: value } })),
    setActivate: (value: boolean) =>
        set((state) => ({ category: { ...state.category, activate: value } })),
    setImageFile: (value: IImage) =>
        set((state) => ({
            category: { ...state.category, path: '', imageFile: value },
        })),
    addMiddleCategories: (value: IMiddleCategory) =>
        set((state) => ({
            category: {
                ...state.category,
                middleCategories: [...state.category.middleCategories, value],
            },
        })),
    editMiddleCategories: (index: number, value: IMiddleCategory) =>
        set((state) => ({
            category: {
                ...state.category,
                middleCategories: state.category.middleCategories.map(
                    (item, i) => (i === index ? value : item)
                ),
            },
        })),
    deleteMiddleCategories: (index: number) =>
        set((state) => ({
            category: {
                ...state.category,
                middleCategories: state.category.middleCategories.filter(
                    (_, i) => i !== index
                ),
            },
        })),
}));
