import { create } from 'zustand';
import { IEditBanner } from '../../types/banner';

interface IBannerEditStore {
    banner: IEditBanner | null;
    init: (newState: IEditBanner) => void;
    update: (newState: Partial<IEditBanner>) => void;
}

export const useEditBannerStore = create<IBannerEditStore>((set) => ({
    banner: null,
    init: (newState: IEditBanner) =>
        set(() => ({
            banner: newState,
        })),
    update: (newState: Partial<IEditBanner>) =>
        set((state) => ({
            banner: state.banner ? { ...state.banner, ...newState } : null,
        })),
}));
