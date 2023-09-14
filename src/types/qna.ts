import { IImage } from '../components/commons/MultiImageUpload';
import { IBase } from './base';
import { ICreateComment } from './comment';
import { IServiceCategory } from './serviceCategory';

export interface IQna extends IBase {
    title: string;
    content: string;
    images: string[];
    serviceCategory: IServiceCategory;
    authorUUID: string;
    qnaStatus: string;
}

export interface ICreateQna {
    authorUUID: string;
    qnaStatus: string;
    title: string;
    content: string;
    images: IImage[];
    serviceCategory: IServiceCategory | null;
    serviceCategoryId?: number;
    activate: boolean;
    comments?: ICreateComment[] | null;
}

export interface IEditQna extends IBase {
    authorUUID: string;
    qnaStatus: string;
    title: string;
    content: string;
    images: IImage[];
    serviceCategory: IServiceCategory | null;
    serviceCategoryId?: number;
    activate: boolean;
    comments: ICreateComment[] | null;
    editComments?: ICreateComment[] | null;
    addComments?: ICreateComment[] | null;
}
