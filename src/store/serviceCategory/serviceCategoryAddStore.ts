import { create } from 'zustand';
import { ICreateServiceCategory } from '../../types/serviceCategory';

interface IServiceCategoryAddStore {
    serviceCategory: ICreateServiceCategory;
    update: (newState: Partial<ICreateServiceCategory>) => void;
}

export const useAddServiceCategoryStore = create<IServiceCategoryAddStore>(
    (set) => ({
        serviceCategory: {
            name: '',
            type: '',
            activate: false,
        },
        update: (newState: Partial<ICreateServiceCategory>) =>
            set((state) => ({
                serviceCategory: { ...state.serviceCategory, ...newState },
            })),
    })
);
