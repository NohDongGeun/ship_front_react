import { create } from 'zustand';
import { IEditCommunity } from '../../types/community';

interface ICommunityEditStore {
    community: IEditCommunity | null;
    init: (newState: IEditCommunity) => void;
    update: (newState: Partial<IEditCommunity>) => void;
}

export const useEditCommunityStore = create<ICommunityEditStore>((set) => ({
    community: null,
    init: (newState: IEditCommunity) =>
        set(() => ({
            community: newState,
        })),
    update: (newState: Partial<IEditCommunity>) =>
        set((state) => ({
            community: state.community
                ? { ...state.community, ...newState }
                : null,
        })),
}));
