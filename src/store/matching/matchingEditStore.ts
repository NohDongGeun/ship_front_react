import { create } from 'zustand';
import { IMatching } from '../../types/matching';

interface IMatchingEditStore {
    matching: IMatching | null;
    init: (newState: IMatching) => void;
    update: (newState: Partial<IMatching>) => void;
}

export const useEditMatchingStore = create<IMatchingEditStore>((set) => ({
    matching: null,
    init: (newState: IMatching) =>
        set(() => ({
            matching: newState,
        })),
    update: (newState: Partial<IMatching>) =>
        set((state) => ({
            matching: state.matching
                ? { ...state.matching, ...newState }
                : null,
        })),
}));
