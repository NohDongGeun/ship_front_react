import { HEADER_JSON_TYPE } from '../constants/apiConstants';
import { API_BASE_URL, PATH_API_MATCHINGS } from '../constants/pathConstants';
import { ICreateMatching, IMatching } from '../types/matching';
import { instance } from './axios';
import { createHeader } from './utils';

export const getMatchings = async (
    queryString: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MATCHINGS}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getMatching = async (matchingId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_MATCHINGS}/${matchingId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createMatching = async (
    data: ICreateMatching,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MATCHINGS}`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const updateMatching = async (
    data: Partial<IMatching>,
    matchingId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MATCHINGS}/${matchingId}`;
    const res = await instance.put(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const deleteMatching = async (
    matchingId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MATCHINGS}/${matchingId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
