import { create } from 'zustand';
import { ICreateUser } from '../../types/user';

interface IUserAddStore {
    user: ICreateUser;
    updateUser: (newState: Partial<ICreateUser>) => void;
}

export const useAddUserStore = create<IUserAddStore>((set) => ({
    user: {
        name: '',
        nickname: '',
        phone: '',
        identyKey: '',
        password: '',
        passwordVerify: '',
        activate: false,
    },
    updateUser: (newState: Partial<ICreateUser>) =>
        set((state) => ({
            user: { ...state.user, ...newState },
        })),
}));
