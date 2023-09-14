import { IBase } from './base';

export interface IServiceCategory extends IBase {
    name: string;
    type: string;
}

export interface ICreateServiceCategory {
    name: string;
    type: string;
    activate: boolean;
}

export interface IEditServiceCategory {
    name?: string;
    type?: string;
    activate?: boolean;
}
