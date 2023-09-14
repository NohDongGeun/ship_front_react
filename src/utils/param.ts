import { ParsedUrlQuery } from 'querystring';

const formatDateToISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day} 00:00:00`;
};

export const buildQueryString = (query: ParsedUrlQuery): string => {
    const searchParams = new URLSearchParams();

    for (const key in query) {
        if (Array.isArray(query[key])) {
            (query[key] as string[]).forEach((value) =>
                searchParams.append(key, value)
            );
        } else {
            searchParams.set(key, query[key] as string);
        }
    }

    return searchParams.toString();
};

export const createUrlParams = (params: {
    page?: number;
    searchType?: string;
    searchTypeValue?: string;
    activate?: string;
    startDate?: Date | null | undefined;
    endDate?: Date | null | undefined;
    limit?: number;
    matchingStatus?: string;
    qnaStatus?: string;
}): string => {
    const urlParams = new URLSearchParams();
    if (params.page !== undefined) {
        urlParams.append('page', String(params.page));
    }
    if (params.searchType) {
        urlParams.append('searchType', params.searchType);
    }
    if (params.searchTypeValue) {
        urlParams.append('searchTypeValue', params.searchTypeValue);
    }
    if (params.activate) {
        if (params.activate !== 'all') {
            urlParams.append('activate', params.activate);
        }
    }

    if (params.qnaStatus) {
        if (params.qnaStatus !== 'all') {
            urlParams.append('qnaStatus', params.qnaStatus);
        }
    }
    if (params.matchingStatus) {
        if (params.matchingStatus !== 'all') {
            urlParams.append('matchingStatus', params.matchingStatus);
        }
    }
    if (params.startDate) {
        urlParams.append('startDate', formatDateToISO(params.startDate));
    }
    if (params.endDate) {
        urlParams.append('endDate', formatDateToISO(params.endDate));
    }
    if (params.limit !== undefined) {
        urlParams.append('limit', String(params.limit));
    }

    return urlParams.toString();
};
