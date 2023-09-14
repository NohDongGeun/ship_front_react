import { create } from 'zustand';

interface IQnasStore {
    page: number;
    searchType: string;
    searchTypeValue: string;
    activate: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    limit: number;
    qnaStatus: string;
    update: (state: Partial<IQnasStore>) => void;
}

export const useQnasStore = create<IQnasStore>()((set) => ({
    page: 1,
    searchType: '',
    searchTypeValue: '',
    activate: 'all',
    qnaStatus: 'all',
    startDate: null,
    endDate: null,
    limit: 10,
    update: (newState) => set((state) => ({ ...state, ...newState })),
}));
