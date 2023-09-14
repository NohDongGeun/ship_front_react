import { create } from 'zustand';
import { ICreateFaq } from '../../types/faq';

interface IFaqAddStore {
    faq: ICreateFaq;
    update: (newState: Partial<ICreateFaq>) => void;
}

export const useAddFaqStore = create<IFaqAddStore>((set) => ({
    faq: {
        title: '',
        content: '',
        images: [],
        serviceCategory: null,
        activate: false,
    },
    update: (newState: Partial<ICreateFaq>) =>
        set((state) => ({
            faq: { ...state.faq, ...newState },
        })),
}));
