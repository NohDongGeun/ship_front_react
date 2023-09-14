import { HEADER_JSON_TYPE } from '../constants/apiConstants';
import {
    API_BASE_URL,
    PATH_API_SERVICE_CATEGORIES,
} from '../constants/pathConstants';
import { ICreateServiceCategory } from '../types/serviceCategory';
import { instance } from './axios';
import { createHeader } from './utils';

export const getServiceCategories = async (
    queryString: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_SERVICE_CATEGORIES}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getServiceCategory = async (
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_SERVICE_CATEGORIES}/${categoryId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createServiceCategory = async (
    data: ICreateServiceCategory,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_SERVICE_CATEGORIES}`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const updateServiceCategory = async (
    data: Partial<ICreateServiceCategory>,
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_SERVICE_CATEGORIES}/${categoryId}`;
    const res = await instance.put(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const deleteServiceCategory = async (
    categoryId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_SERVICE_CATEGORIES}/${categoryId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
