import { HEADER_JSON_TYPE } from '../constants/apiConstants';
import { API_BASE_URL, PATH_API_FAQS } from '../constants/pathConstants';
import { instance } from './axios';
import { createHeader } from './utils';

export const getFaqs = async (queryString: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_FAQS}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getFaq = async (faqId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_FAQS}/${faqId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createFaq = async (data: any, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_FAQS}`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const updateFaq = async (
    faqId: string,
    data: any,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_FAQS}/${faqId}`;
    const res = await instance.put(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const deleteFaq = async (faqId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_FAQS}/${faqId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
