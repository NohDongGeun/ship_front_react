import { HEADER_JSON_TYPE } from '../constants/apiConstants';
import { PATH_API_ADMINS } from '../constants/pathConstants';
import { ICreateAdmin, IEditAdmin } from '../types/admin';
import { instance } from './axios';
import { createHeader } from './utils';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

export const getAdmins = async (queryString: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_ADMINS}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });
    return res.data;
};

export const getAdmin = async (adminId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_ADMINS}/${adminId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createAdmin = async (
    adminData: Partial<ICreateAdmin>,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_ADMINS}`;
    const res = await instance.post(url, adminData, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data ? res.data : null;
};

export const updateAdmin = async (
    adminId: string,
    adminData: Partial<IEditAdmin>,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_ADMINS}/${adminId}`;
    const res = await instance.put(url, adminData, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const deleteAdmin = async (adminId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_ADMINS}/${adminId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
