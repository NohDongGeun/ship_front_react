import { IBase } from './base';

export interface ICreateAdmin {
    name: string;
    nickname: string;
    password: string;
    passwordVerify: string;
    phone: string;
    identyKey: string;
    activate: boolean;
}

export interface IAdmin extends IBase {
    uuid?: string;
    name: string;
    nickname: string;
    identyKey: string;
    phone: string;
    activate: boolean;
    authorities: IAdminAuthority[];
}

export interface IAdminAuthority {
    id: number;
    name: string;
}

export interface IEditAdmin extends IBase {
    uuid: string;
    name: string;
    nickname: string;
    password: string;
    passwordVerify: string;
    phone: string;
    identyKey: string;
    activate: boolean;
}
