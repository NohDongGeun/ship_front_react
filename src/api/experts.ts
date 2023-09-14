import {
    HEADER_FORM_DATA_TYPE,
    HEADER_JSON_TYPE,
} from '../constants/apiConstants';
import {
    API_BASE_URL,
    PATH_API_EXPERTS,
    PATH_API_USERS,
} from '../constants/pathConstants';
import { instance } from './axios';
import { createHeader } from './utils';

export const getExperts = async (queryString: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_EXPERTS}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getExpert = async (
    userId: string,
    expertId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_EXPERTS}/${expertId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createExpert = async (
    formData: FormData,
    userId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}/expert`;
    const res = await instance.post(url, formData, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const updateExpert = async (
    formData: FormData,
    userId: string,
    expertId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}/expert`;
    const res = await instance.put(url, formData, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const deleteExpert = async (
    userId: string,
    expertId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}/expert`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
