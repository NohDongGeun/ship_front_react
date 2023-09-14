import { IAuthor } from './author';
import { IBase } from './base';
import { ICreateComment } from './comment';
import { ICommunityCategory } from './communityCategory';

export interface ICommunity extends IBase {
    title: string;
    content: string;
    author: IAuthor;
    authorUUID: string;
    images: [];
    status: string;
    communityCategory: ICommunityCategory;
    goods: number;
}

export interface ICreateCommunity {
    title: string;
    content: string;
    authorUUID: string;
    images: [];
    status: string;
    communityCategory: ICommunityCategory | null;
    activate: boolean;
    goods: number;
    comments: ICreateComment[];
}

export interface IEditCommunity extends IBase {
    title: string;
    content: string;
    author: IAuthor;
    images: [];
    status: string;
    category: ICommunityCategory | null;
    communityCategoryId?: number;
    activate: boolean;
    goods: number;
    comments: ICreateComment[];
}
