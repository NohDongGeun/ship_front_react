import { create } from 'zustand';
import { IEditAdmin } from '../../types/admin';

interface IAdminEditStore {
    admin: IEditAdmin | null;
    initAdmin: (newState: IEditAdmin) => void;
    update: (newState: Partial<IEditAdmin>) => void;
}

export const useEditAdminStore = create<IAdminEditStore>((set) => ({
    admin: null,
    initAdmin: (newState: IEditAdmin) =>
        set(() => ({
            admin: newState,
        })),
    update: (newState: Partial<IEditAdmin>) =>
        set((state) => ({
            admin: state.admin ? { ...state.admin, ...newState } : null,
        })),
}));
