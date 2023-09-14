import { AxiosError } from 'axios';
import { create } from 'zustand';
import { IError } from '../../types/error';

interface IGlobalState {
    isInitializing: boolean;
    isLoading: boolean;
    errorMessage: string;
    successMessage: string;
    set: (state: Partial<IGlobalState>) => void;
}

export const useGlobalState = create<IGlobalState>()((set) => ({
    isInitializing: true,
    isLoading: false,
    errorMessage: '',
    successMessage: '',
    set: (newState) => set((state) => ({ ...state, ...newState })),
}));
