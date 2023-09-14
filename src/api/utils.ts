import {
    HEADER_FORM_DATA_TYPE,
    HEADER_JSON_TYPE,
} from '../constants/apiConstants';

export const createHeader = (
    type: string,
    accessToken?: string,
    erk?: string
) => {
    let headers: { [key: string]: string } = {};

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (erk) {
        headers['X-ERK'] = `${erk}`;
    }

    if (type === HEADER_JSON_TYPE) {
        headers['Content-Type'] = 'application/json';
    } else if (type === HEADER_FORM_DATA_TYPE) {
        headers['Content-Type'] = 'multipart/form-data';
    }

    return headers;
};
