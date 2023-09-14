import {
    HEADER_FORM_DATA_TYPE,
    HEADER_JSON_TYPE,
} from '../constants/apiConstants';
import {
    API_BASE_URL,
    PATH_API_USERS,
    PATH_API_WHOLESALES,
} from '../constants/pathConstants';
import { instance } from './axios';
import { createHeader } from './utils';

export const getWholesales = async (
    queryString: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_WHOLESALES}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getWholesale = async (
    wholesaleId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_WHOLESALES}/${wholesaleId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createWholesale = async (
    data: FormData,
    userId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}/wholesale`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const updateWholesale = async (
    data: FormData,
    userId: string,
    wholesaleId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}${PATH_API_WHOLESALES}/${wholesaleId}`;
    const res = await instance.put(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const deleteWholesale = async (
    userId: string,
    wholesaleId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}${PATH_API_WHOLESALES}/${wholesaleId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
