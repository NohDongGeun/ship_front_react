import { create } from 'zustand';

export interface IMarketStore {
    state: {
        page: number;
        searchType: string;
        searchTypeValue: string;
        activate: string;
        startDate: Date | null | undefined;
        endDate: Date | null | undefined;
        limit: number;
    };
    actions: {
        set: (newState: Partial<IMarketStore['state']>) => void;
    };
}

export const useMarketsStore = create<IMarketStore>((set) => ({
    state: {
        page: 1,
        searchType: '',
        searchTypeValue: '',
        activate: 'all',
        startDate: null,
        endDate: null,
        limit: 10,
    },
    actions: {
        set: (newState) =>
            set((state) => ({ state: { ...state.state, ...newState } })),
    },
}));
