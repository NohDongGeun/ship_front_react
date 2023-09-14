import {
    HEADER_FORM_DATA_TYPE,
    HEADER_JSON_TYPE,
} from '../constants/apiConstants';
import { API_BASE_URL, PATH_API_COMMUNITIES } from '../constants/pathConstants';
import { instance } from './axios';
import { createHeader } from './utils';

export const getCommunities = async (
    queryString: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITIES}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getCommunity = async (
    communityId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITIES}/${communityId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });
    return res.data;
};

export const createCommunity = async (data: any, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITIES}`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const updateCommunity = async (
    data: any,
    communityId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITIES}/${communityId}`;
    const res = await instance.put(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const deleteCommunity = async (
    communityId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_COMMUNITIES}/${communityId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
