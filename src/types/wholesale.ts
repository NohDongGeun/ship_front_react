import { IImage } from '../components/commons/MultiImageUpload';
import { IBase } from './base';
import { ICategory, ISelectedMiddleCategory } from './category';
import { IServerImage } from './images';
import { IMarketAdd, IMarketEdit } from './market';
import { IUser } from './user';

export interface ICreateWholesale {
    uuid: string;
    name: string;
    storeName: string;
    thumbnail: IImage | null;
    imageFiles: IImage[];
    businessNumber: string;
    address: string;
    latitude: number;
    longitude: number;
    marketId: number;
    career: string;
    profile: string;
    activate: boolean;
    content: string;
    mainCategories: ICategory[];
    user?: any;
}

export interface IWholesalePhoto {
    id: number;
    path: string;
    activate: boolean;
}

export interface IWholesale extends IBase {
    name: string;
    storeName: string;
    businessNumber: string;
    address: string;
    latitude: number;
    longitude: number;
    marketId: number;
    career: string;
    profile: string;
    content: string;
    thumbnail: string;
    mainCategories: [];
    middleCategories: [];
    user?: IUser;
}

export interface IWholesaleEdit extends IBase {
    name: string;
    storeName: string;
    businessNumber: string;
    address: string;
    latitude: number;
    longitude: number;
    market: IMarketEdit;
    career: string;
    profile: string;
    content: string;
    thumbnail: string;
    categories: ICategory[];
    images: IServerImage[];
    imageFiles: IImage[];
    thumbnailImageFile: IImage | null;
    user: IUser;
    marketId?: number;
    deleteImages?: any;
    addMainCategories?: any[];
    deleteMainCategories?: any[];
    addMiddleCategories?: any[];
    deleteMiddleCategories?: any[];
}
