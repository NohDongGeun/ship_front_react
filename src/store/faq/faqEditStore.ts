import { create } from 'zustand';
import { IEditFaq } from '../../types/faq';

interface IFaqEditStore {
    faq: IEditFaq;
    init: (newState: IEditFaq) => void;
    update: (newState: Partial<IEditFaq>) => void;
}

export const useEditFaqStore = create<IFaqEditStore>((set) => ({
    faq: {
        id: 0,
        title: '',
        content: '',
        images: [],
        serviceCategory: null,
        activate: false,
        createdDateTime: '',
        lastModifiedDateTime: '',
    },
    init: (newState: IEditFaq) =>
        set(() => ({
            faq: newState,
        })),
    update: (newState: Partial<IEditFaq>) =>
        set((state) => ({
            faq: { ...state.faq, ...newState },
        })),
}));
