import { create } from 'zustand';
import { ICommunityCategory } from '../../types/communityCategory';

interface ICommunityCategoryEditStore {
    communityCategory: ICommunityCategory | null;
    init: (newState: ICommunityCategory) => void;
    update: (newState: Partial<ICommunityCategory>) => void;
}

export const useEditCommunityCategoryStore = create<
    ICommunityCategoryEditStore
>((set) => ({
    communityCategory: null,
    init: (newState: ICommunityCategory) =>
        set(() => ({
            communityCategory: newState,
        })),
    update: (newState: Partial<ICommunityCategory>) =>
        set((state) => ({
            communityCategory: state.communityCategory
                ? { ...state.communityCategory, ...newState }
                : null,
        })),
}));
