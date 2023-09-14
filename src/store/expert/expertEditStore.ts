import { create } from 'zustand';
import { IEditExpert } from '../../types/expert';

interface IExpertEditStore {
    expert: IEditExpert | null;
    init: (newState: IEditExpert) => void;
    update: (newState: Partial<IEditExpert>) => void;
}

export const useEditExpertStore = create<IExpertEditStore>((set) => ({
    expert: null,
    init: (newState: IEditExpert) =>
        set(() => ({
            expert: newState,
        })),
    update: (newState: Partial<IEditExpert>) =>
        set((state) => ({
            expert: state.expert ? { ...state.expert, ...newState } : null,
        })),
}));
