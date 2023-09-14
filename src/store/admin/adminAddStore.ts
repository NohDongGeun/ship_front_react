import { create } from 'zustand';
import { ICreateAdmin } from '../../types/admin';

interface IAdminAddStore {
    admin: ICreateAdmin;
    update: (newState: Partial<ICreateAdmin>) => void;
}

export const useAddAdminStore = create<IAdminAddStore>((set) => ({
    admin: {
        name: '',
        nickname: '',
        phone: '',
        identyKey: '',
        password: '',
        passwordVerify: '',
        activate: false,
    },
    update: (newState: Partial<ICreateAdmin>) =>
        set((state) => ({
            admin: { ...state.admin, ...newState },
        })),
}));
