import { HEADER_JSON_TYPE } from '../constants/apiConstants';
import { API_BASE_URL, PATH_API_USERS } from '../constants/pathConstants';
import { ICreateUser, IUpdateUser } from '../types/user';
import { instance } from './axios';
import { createHeader } from './utils';

export const getUsers = async (queryString: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getUser = async (userId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createUser = async (
    data: Partial<ICreateUser>,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const updateUser = async (
    data: Partial<IUpdateUser>,
    userId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}`;
    const res = await instance.put(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const deleteUser = async (userId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_USERS}/${userId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
