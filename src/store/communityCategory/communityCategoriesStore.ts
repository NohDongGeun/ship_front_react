import { create } from 'zustand';

interface ICommunityCategoriesStore {
    page: number;
    searchType: string;
    searchTypeValue: string;
    activate: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    limit: number;
    set: (state: Partial<ICommunityCategoriesStore>) => void;
}

export const useCommunityCategoriesStore = create<ICommunityCategoriesStore>()(
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
