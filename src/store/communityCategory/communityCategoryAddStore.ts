import { create } from 'zustand';
import { ICreateCommunityCategory } from '../../types/communityCategory';

interface ICommunityCategoryAddStore {
    communityCategory: ICreateCommunityCategory;
    update: (newState: Partial<ICreateCommunityCategory>) => void;
}

export const useAddCommunityCategoryStore = create<ICommunityCategoryAddStore>(
    (set) => ({
        communityCategory: {
            name: '',
            activate: false,
        },
        update: (newState: Partial<ICreateCommunityCategory>) =>
            set((state) => ({
                communityCategory: { ...state.communityCategory, ...newState },
            })),
    })
);
