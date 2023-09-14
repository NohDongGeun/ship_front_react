import { IBase } from './base';

export interface ICommunityCategory extends IBase {
    name: string;
}

export interface ICreateCommunityCategory {
    name: string;
    activate: boolean;
}

export interface IEditCommunityCategory {
    name?: string;
    activate?: boolean;
}
