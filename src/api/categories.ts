import {
    HEADER_FORM_DATA_TYPE,
    HEADER_JSON_TYPE,
} from '../constants/apiConstants';
import {
    API_BASE_URL,
    PATH_API_MAIN_CATEGORIES,
} from '../constants/pathConstants';
import { instance } from './axios';
import { createHeader } from './utils';

export const getMainCategories = async (
    queryString: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MAIN_CATEGORIES}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getMainCategory = async (
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MAIN_CATEGORIES}/${categoryId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createMainCategory = async (
    formData: FormData,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MAIN_CATEGORIES}`;
    const res = await instance.post(url, formData, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const updateMainCategory = async (
    formData: FormData,
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MAIN_CATEGORIES}/${categoryId}`;
    const res = await instance.put(url, formData, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const deleteMainCategory = async (
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MAIN_CATEGORIES}/${categoryId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
