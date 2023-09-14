import { HEADER_JSON_TYPE } from '../constants/apiConstants';
import {
    API_BASE_URL,
    PATH_API_COMMUNITY_CATEGORIES,
} from '../constants/pathConstants';
import { ICreateCommunityCategory } from '../types/communityCategory';
import { instance } from './axios';
import { createHeader } from './utils';

export const getCommunityCategories = async (
    queryString: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITY_CATEGORIES}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getCommunityCategory = async (
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITY_CATEGORIES}/${categoryId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createCommunityCategory = async (
    data: ICreateCommunityCategory,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITY_CATEGORIES}`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const updateCommunityCategory = async (
    data: Partial<ICreateCommunityCategory>,
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITY_CATEGORIES}/${categoryId}`;
    const res = await instance.put(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const deleteCommunityCategory = async (
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITY_CATEGORIES}/${categoryId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
