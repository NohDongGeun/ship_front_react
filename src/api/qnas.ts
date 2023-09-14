import { HEADER_JSON_TYPE } from '../constants/apiConstants';
import { API_BASE_URL, PATH_API_QNAS } from '../constants/pathConstants';
import { ICreateQna } from '../types/qna';
import { instance } from './axios';
import { createHeader } from './utils';

export const getQnas = async (queryString: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_QNAS}?${queryString}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const getQna = async (qnaId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_QNAS}/${qnaId}`;
    const res = await instance.get(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const createQna = async (
    data: Partial<ICreateQna>,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_QNAS}`;
    const res = await instance.post(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const updateQna = async (
    qnaId: string,
    data: any,
    accessToken: string
) => {
    const url = `${API_BASE_URL}${PATH_API_QNAS}/${qnaId}`;
    const res = await instance.put(url, data, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};

export const deleteQna = async (qnaId: string, accessToken: string) => {
    const url = `${API_BASE_URL}${PATH_API_QNAS}/${qnaId}`;
    const res = await instance.delete(url, {
        responseType: 'json',
        headers: createHeader(HEADER_JSON_TYPE, accessToken),
    });

    return res.data;
};
