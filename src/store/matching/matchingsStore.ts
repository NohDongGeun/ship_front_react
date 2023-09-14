import { create } from 'zustand';

interface IMatchingsStore {
    page: number;
    searchType: string;
    searchTypeValue: string;
    activate: string;
    matchingStatus: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    limit: number;
    set: (state: Partial<IMatchingsStore>) => void;
}

export const useMatchingsStore = create<IMatchingsStore>()((set) => ({
    page: 1,
    searchType: '',
    searchTypeValue: '',
    activate: 'all',
    matchingStatus: 'all',
    startDate: null,
    endDate: null,
    limit: 10,
    set: (newState) => set((state) => ({ ...state, ...newState })),
}));
