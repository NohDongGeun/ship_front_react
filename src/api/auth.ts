import { HEADER_JSON_TYPE } from '../constants/apiConstants';
import { PATH_API_AUTH } from '../constants/pathConstants';
import { ISignin } from '../types/auth';
import { instance } from './axios';
import { createHeader } from './utils';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

export const signin = async (data: ISignin) => {
    const url = `${API_BASE_URL}${PATH_API_AUTH}`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: { 'Content-Type': 'application/json' },
    });

    return res.data;
};

export const refreshToken = async (accessToken: string, xerk: string) => {
    const url = `${API_BASE_URL}${PATH_API_AUTH}`;
    const res = await instance.put(
        url,
        {},
        {
            responseType: 'json',
            headers: createHeader(HEADER_JSON_TYPE, accessToken, xerk),
        }
    );

    return res.data;
};

export const checkAuthenticate = async (accessToken: string, xerk: string) => {
    const url = `${API_BASE_URL}${PATH_API_AUTH}/check`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken, xerk),
    });

    return res.data;
};
