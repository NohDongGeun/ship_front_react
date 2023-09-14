import { json } from 'stream/consumers';
import {
    HEADER_FORM_DATA_TYPE,
    HEADER_JSON_TYPE,
} from '../constants/apiConstants';
import { API_BASE_URL, PATH_API_MARKETS } from '../constants/pathConstants';
import { instance } from './axios';
import { createHeader } from './utils';

export const getMarkets = async (queryString: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_MARKETS}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getMarket = async (marketId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_MARKETS}/${marketId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });
    return res.data;
};

export const createMarket = async (formData: FormData, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_MARKETS}`;
    const res = await instance.post(url, formData, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const updateMarket = async (
    formData: FormData,
    marketId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_MARKETS}/${marketId}`;
    const res = await instance.put(url, formData, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const deleteMarket = async (marketId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_MARKETS}/${marketId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
