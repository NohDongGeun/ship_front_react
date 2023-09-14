import { create } from 'zustand';
import { IServiceCategory } from '../../types/serviceCategory';

interface IServiceCategoryEditStore {
    serviceCategory: IServiceCategory | null;
    init: (newState: IServiceCategory) => void;
    update: (newState: Partial<IServiceCategory>) => void;
}

export const useEditServiceCategoryStore = create<IServiceCategoryEditStore>(
    (set) => ({
        serviceCategory: null,
        init: (newState: IServiceCategory) =>
            set(() => ({
                serviceCategory: newState,
            })),
        update: (newState: Partial<IServiceCategory>) =>
            set((state) => ({
                serviceCategory: state.serviceCategory
                    ? { ...state.serviceCategory, ...newState }
                    : null,
            })),
    })
);
