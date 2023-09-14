import { create } from 'zustand';
import { IEditQna } from '../../types/qna';

interface IQnaEditStore {
    qna: IEditQna;
    init: (newState: IEditQna) => void;
    update: (newState: Partial<IEditQna>) => void;
}

export const useEditQnaStore = create<IQnaEditStore>((set) => ({
    qna: {
        id: 0,
        title: '',
        content: '',
        images: [],
        serviceCategory: null,
        activate: false,
        createdDateTime: '',
        lastModifiedDateTime: '',
        authorUUID: '',
        qnaStatus: '',
        comments: null,
    },
    init: (newState: IEditQna) =>
        set(() => ({
            qna: newState,
        })),
    update: (newState: Partial<IEditQna>) =>
        set((state) => ({
            qna: { ...state.qna, ...newState },
        })),
}));
