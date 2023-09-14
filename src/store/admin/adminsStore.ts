import { create } from 'zustand';

interface IAdminsStore {
    page: number;
    searchType: string;
    searchTypeValue: string;
    activate: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    limit: number;
    update: (state: Partial<IAdminsStore>) => void;
}

export const useAdminsStore = create<IAdminsStore>()((set) => ({
    page: 1,
    searchType: '',
    searchTypeValue: '',
    activate: 'all',
    startDate: null,
    endDate: null,
    limit: 10,
    update: (newState) => set((state) => ({ ...state, ...newState })),
}));
