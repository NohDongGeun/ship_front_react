import { IImage } from '../components/commons/MultiImageUpload';
import { IBase } from './base';

export interface IBanner extends IBase {
    path: string;
    thumbnail: string;
}

export interface ICreateBanner {
    path: string;
    imageFile: IImage | null;
    activate: boolean;
}

export interface IEditBanner extends IBase {
    path: string;
<<<<<<< HEAD
=======
    link?: string;
>>>>>>> dev
    thumbnail: string;
    activate: boolean;
    imageFile: IImage | null;
}
