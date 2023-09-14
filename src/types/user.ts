import { IBase } from './base';

export interface IUser {}

export interface ICreateUser {
    name: string;
    nickname: string;
    password: string;
    passwordVerify: string;
    phone: string;
    identyKey: string;
    activate: boolean;
}

export interface IUser extends IBase {
    uuid?: string;
    name: string;
    nickname: string;
    password: string;
    phone: string;
    identyKey: string;
    images: string;
}

export interface IUpdateUser extends IUser {
    passwordVerify?: string;
}
