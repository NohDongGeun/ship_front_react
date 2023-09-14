import {
    HEADER_FORM_DATA_TYPE,
    HEADER_JSON_TYPE,
} from '../constants/apiConstants';
import { API_BASE_URL, PATH_API_BANNERS } from '../constants/pathConstants';
import { instance } from './axios';
import { createHeader } from './utils';

export const getBanners = async (queryString: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_BANNERS}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getBanner = async (bannerId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_BANNERS}/${bannerId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createBanner = async (formData: FormData, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_BANNERS}`;
    const res = await instance.post(url, formData, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const updateBanner = async (
    formData: FormData,
    bannerId: string,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_BANNERS}/${bannerId}`;
    const res = await instance.put(url, formData, {
        responseType: 'json',
        headers: createHeader(HEADER_FORM_DATA_TYPE, accessToken),
    });

    return res.data;
};

export const deleteBanner = async (bannerId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_BANNERS}/${bannerId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
