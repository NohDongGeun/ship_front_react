import { create } from 'zustand';
import { IUpdateUser } from '../../types/user';

interface IUserEditStore {
    user: IUpdateUser | null;
    initUser: (newState: IUpdateUser) => void;
    updateUser: (newState: Partial<IUpdateUser>) => void;
}

export const useEditUserStore = create<IUserEditStore>((set) => ({
    user: null,
    initUser: (newState: IUpdateUser) =>
        set(() => ({
            user: newState,
        })),
    updateUser: (newState: Partial<IUpdateUser>) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...newState } : null,
        })),
}));
