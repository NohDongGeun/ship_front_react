import { IImage } from '../components/commons/MultiImageUpload';
import { IBase } from './base';

export interface ICategory extends IBase {
    name: string;
    path: string;
    imageFile: IImage | null;
    middleCategories: IMiddleCategory[];
    mainCategoryId?: number;
}

export interface IMiddleCategory {
    id?: number;
    name: string;
    activate: boolean;
    createdDateTime?: string;
    lastModifiedDateTime?: string;
    isSelect?: boolean;
    mainCategoryId?: number;
}

export interface ISelectedMainCategory {
    id: number;
}

export interface ISelectedMiddleCategory {
    id: number;
}

export interface IAddedCategory {
    id: number;
}
