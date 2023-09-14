import { create } from 'zustand';
import { ICreateCommunity } from '../../types/community';

interface ICommunitiesAddStore {
    community: ICreateCommunity;
    update: (newState: Partial<ICreateCommunity>) => void;
}

export const useAddCommunityStore = create<ICommunitiesAddStore>((set) => ({
    community: {
        title: '',
        authorUUID: '',
        status: 'public',
        content: '',
        images: [],
        communityCategory: null,
        activate: false,
        comments: [],
        goods: 0,
    },
    update: (newState: Partial<ICreateCommunity>) =>
        set((state) => ({
            community: { ...state.community, ...newState },
        })),
}));
