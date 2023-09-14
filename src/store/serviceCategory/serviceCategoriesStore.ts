import { create } from 'zustand';

interface IServiceCategoriesStore {
    page: number;
    searchType: string;
    searchTypeValue: string;
    activate: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    limit: number;
    set: (state: Partial<IServiceCategoriesStore>) => void;
}

export const useServiceCategoriesStore = create<IServiceCategoriesStore>()(
    (set) => ({
        page: 1,
        searchType: '',
        searchTypeValue: '',
        activate: 'all',
        startDate: null,
        endDate: null,
        limit: 10,
        set: (newState) => set((state) => ({ ...state, ...newState })),
    })
);
