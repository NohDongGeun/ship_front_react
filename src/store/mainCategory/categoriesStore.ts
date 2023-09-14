import { create } from 'zustand';

interface ICategoriesStore {
    page: number;
    searchType: string;
    searchTypeValue: string;
    activate: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    limit: number;
    set: (state: Partial<ICategoriesStore>) => void;
}

export const useCategoriesStore = create<ICategoriesStore>()((set) => ({
    page: 1,
    searchType: '',
    searchTypeValue: '',
    activate: 'all',
    startDate: null,
    endDate: null,
    limit: 10,
    set: (newState) => set((state) => ({ ...state, ...newState })),
}));
