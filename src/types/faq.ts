import { IImage } from '../components/commons/MultiImageUpload';
import { IBase } from './base';
import { IServiceCategory } from './serviceCategory';

export interface IFaq extends IBase {
    title: string;
    content: string;
    images: string[];
}

export interface ICreateFaq {
    title: string;
    content: string;
    images: IImage[];
    serviceCategory: IServiceCategory | null;
    activate: boolean;
}

export interface IEditFaq extends IBase {
    title: string;
    content: string;
    images: string[];
    serviceCategory: IServiceCategory | null;
    serviceCategoryId?: number;
}
