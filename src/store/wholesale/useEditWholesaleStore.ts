import { create } from 'zustand';
import { IMarketEdit } from '../../types/market';
import { IWholesaleEdit } from '../../types/wholesale';

interface IWholesaleEditStore {
    wholesale: IWholesaleEdit | null;
    initWholesale: (newState: IWholesaleEdit) => void;
    update: (newState: Partial<IWholesaleEdit>) => void;
}

export const useEditWholesaleStore = create<IWholesaleEditStore>((set) => ({
    wholesale: null,
    initWholesale: (newState: IWholesaleEdit) =>
        set(() => ({
            wholesale: newState,
        })),
    update: (newState: Partial<IWholesaleEdit>) =>
        set((state) => ({
            wholesale: state.wholesale
                ? { ...state.wholesale, ...newState }
                : null,
        })),
}));
