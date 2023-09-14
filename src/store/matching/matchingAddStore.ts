import { create } from 'zustand';
import { ICreateMatching } from '../../types/matching';

interface IMatchingAddStore {
    matching: ICreateMatching;
    update: (newState: Partial<ICreateMatching>) => void;
}

export const useAddMatchingStore = create<IMatchingAddStore>((set) => ({
    matching: {
        expertUUID: '',
        applicantUUID: '',
        activate: false,
        matchingStatus: '',
    },
    update: (newState: Partial<ICreateMatching>) =>
        set((state) => ({
            matching: { ...state.matching, ...newState },
        })),
}));
