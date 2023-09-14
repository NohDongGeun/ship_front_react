import { IImage } from '../components/commons/MultiImageUpload';
import { IBase } from './base';
import { ICategory } from './category';

export interface IIdObject {
    id: number;
}

export interface IMarketAddMainCategory {
    id: number;
}

export interface IMarketPhoto {
    id: number;
    path: string;
    activate: boolean;
}

export interface IMarketAdd extends IBase {
    name: string;
    thumbnail: IImage | null;
    contents: string;
    address: string;
    latitude: number;
    longitude: number;
    imageFiles: IImage[];
    mainCategories: ICategory[];
}

export interface IMarketCategories {
    categories: ICategory[];
}

export interface IDeleteMarketPhotos {
    id: number;
}

export interface IMarketEdit extends IBase {
    name: string;
    thumbnail: string;
    contents: string;
    address: string;
    latitude: number;
    longitude: number;
    categories: ICategory[];
    images: IMarketPhoto[];
    imageFiles: IImage[];
    thumbnailImageFile: IImage | null;
    deleteImages: any;
    addMainCategories?: any[];
    deleteMainCategories?: any[];
    addMiddleCategories?: any[];
    deleteMiddleCategories?: any[];
}
