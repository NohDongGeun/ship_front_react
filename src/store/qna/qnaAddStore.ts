import { create } from 'zustand';
import { ICreateQna } from '../../types/qna';

interface IQnaAddStore {
    qna: ICreateQna;
    update: (newState: Partial<ICreateQna>) => void;
}

export const useAddQnaStore = create<IQnaAddStore>((set) => ({
    qna: {
        title: '',
        authorUUID: '',
        qnaStatus: '',
        content: '',
        images: [],
        serviceCategory: null,
        activate: false,
        comments: [],
    },
    update: (newState: Partial<ICreateQna>) =>
        set((state) => ({
            qna: { ...state.qna, ...newState },
        })),
}));
