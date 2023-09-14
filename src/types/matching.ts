import { IBase } from './base';

export interface IMatching extends IBase {
    expert: IMatchingExpert;
    application: IMatchingApplicate;
    matchingStatus: string;
}

export interface ICreateMatching {
    expertUUID: string;
    applicantUUID: string;
    activate: boolean;
    matchingStatus: string;
}

export interface IEditMatching extends IBase {
    expert: any;
    application: any;
    matchingStatus: string;
}

export interface IMatchingExpert {
    id: string;
    name: string;
    businessNumber: string;
    address: string;
    career: string;
    profile: string;
    activate: boolean;
    content: string;
    thumbnail: string | null;
}

export interface IMatchingApplicate {
    id: string;
    name: string;
    identyKey: string;
    phone: string;
    nickname: string;
    thumbnail: string | null;
    activate: boolean;
}
