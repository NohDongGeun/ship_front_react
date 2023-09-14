import { IImage } from '../components/commons/MultiImageUpload';
import { IBase } from './base';
import { ICategory } from './category';
import { IMarketEdit } from './market';
import { IUser } from './user';

export interface ICreateExpert {
    uuid: string;
    name: string;
    businessNumber: string;
    address: string;
    latitude: number;
    longitude: number;
    marketId: number;
    career: string;
    activate: boolean;
    profile: string;
    thumbnail: IImage | null;
    imageFiles: IImage[];
    content: string;
    mainCategories: ICategory[];
    user?: any;
}

export interface IExpertPhoto {
    id: number;
    path: string;
    activate: boolean;
}

export interface IExpert extends IBase {
    name: string;
    businessNumber: string;
    address: string;
    latitude: string;
    longitude: string;
    marketId: number;
    career: string;
    activate: boolean;
    content: string;
    thumbnail: string;
    mainCategories: ICategory[];
    user: any;
}

export interface IEditExpert extends IBase {
    name: string;
    businessNumber: string;
    address: string;
    latitude: string;
    longitude: string;
    marketId: number;
    market: IMarketEdit;
    career: string;
    profile: string;
    activate: boolean;
    content: string;
    thumbnail: string;
    thumbnailImageFile: IImage | null;
    categories: ICategory[];
    images: IExpertPhoto[];
    imageFiles: IImage[];
    user: IUser;
    deleteImages?: any;
    addMainCategories?: any[];
    deleteMainCategories?: any[];
    addMiddleCategories?: any[];
    deleteMiddleCategories?: any[];
}
