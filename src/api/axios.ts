import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';
import { API_BASE_URL } from '../constants/pathConstants';
import { refreshToken } from './auth';

export const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
});

instance.interceptors.response.use(
    (response) => {
        // 요청이 성공적으로 이루어진 경우, 그대로 response를 반환합니다.
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 요청이 401 에러를 반환하고, 해당 요청이 재시도 요청이 아닌 경우
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log('originalRequest', originalRequest);
            console.log('error.response.status', error.response.status);
            originalRequest._retry = true; // 재시도 플래그를 true로 설정합니다.
            let session;
            let accessToken;
            let xerk;
            const req = originalRequest.req;
            // 서버사이드인지 클라이언트 사이드인지 판단합니다.
            if (typeof window === 'undefined') {
                // 서버사이드인 경우
                session = await getSession();
                console.log('session', session);
                accessToken = session?.user.accessToken;
                xerk = session?.user.xerk;
            } else {
                session = await getSession(); // 클라이언트 사이드인 경우
                // session = useSession();
                // accessToken = session.data?.user.accessToken;
                // xerk = session.data?.user.xerk;
                accessToken = session?.user.accessToken;
                xerk = session?.user.xerk;
            }
            // const authorizationHeader = originalRequest.headers.Authorization;
            // const accessToken = authorizationHeader.replace('Bearer ', '');
            // const xerkHeader = originalRequest.headers['X-ERK'];
            // const xerk = originalRequest.headers['X-ERK'];
            // console.log('xerkHeader', xerkHeader);
            // console.log('authorizationHeader', authorizationHeader);

            try {
                if (!accessToken || !xerk) {
                    if (typeof window !== 'undefined') {
                        const currentURL = window.location.pathname;
                        const encodedURL = encodeURIComponent(currentURL);
                        const redirectURL = `/signin?redirect=${encodedURL}`;
                        window.location.href = redirectURL;
                    } else {
                        throw new Error('Authentication required');
                    }
                }
            } catch (error) {
                return Promise.reject(error);
            }
            if (typeof window !== 'undefined') {
                const currentURL = window.location.pathname;
                const encodedURL = encodeURIComponent(currentURL);
                const redirectURL = `/signin?redirect=${encodedURL}`;
                window.location.href = redirectURL;
            } else {
                throw new Error('Authentication required');
            }
            try {
                const response = await refreshToken(accessToken, xerk);
                if (!response || !response.response) {
                    return Promise.reject(error);
                }

                // // NextAuth 세션 업데이트
                await signIn('Credentials', {
                    redirect: false,
                    accessToken: response.response.accessToken,
                    xerk: response.response.xerk,
                });
                // // 재시도 요청 설정
                const retryConfig = {
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                        Authorization:
                            'Bearer ' + response.response.accessToken,
                    },
                };
                // 재시도 요청을 보냅니다.
                return instance(retryConfig);
            } catch (error) {
                if (typeof window !== 'undefined') {
                    const currentURL = window.location.pathname;
                    const encodedURL = encodeURIComponent(currentURL);
                    const redirectURL = `/signin?redirect=${encodedURL}`;
                    window.location.href = redirectURL;
                } else {
                    throw new Error('Token refresh failed');
                }
            }
        }

        // 에러를 반환합니다.
        return Promise.reject(error);
    }
);

export default instance;
