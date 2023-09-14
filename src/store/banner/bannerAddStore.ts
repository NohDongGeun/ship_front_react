import { create } from 'zustand';
import { ICreateBanner } from '../../types/banner';

interface IBannerAddStore {
    banner: ICreateBanner;
    update: (newState: Partial<ICreateBanner>) => void;
}

export const useAddBannerStore = create<IBannerAddStore>((set) => ({
    banner: {
        path: '',
        imageFile: null,
        activate: false,
    },
    update: (newState: Partial<ICreateBanner>) =>
        set((state) => ({
            banner: { ...state.banner, ...newState },
        })),
}));
