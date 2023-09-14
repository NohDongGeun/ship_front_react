import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
    SERVER_500_ERROR_MESSAGE,
    SUCCESS_SUBMIT_MESSAGE,
} from '../constants/messageConstants';
import { useGlobalState } from '../store/global/globalState';
import { IErrorResponse } from '../types/error';
import { containsKorean } from '../utils/regex';

export const useSubmitHandler = (
    isLoading: boolean,
    isSuccess: boolean,
    path: string,
    error?: AxiosError<IErrorResponse> | null
) => {
    const router = useRouter();
    const setGlobal = useGlobalState((state) => state.set);

    useEffect(() => {
        if (isLoading) {
            setGlobal({ isLoading: true });
        }
    }, [isLoading]);

    useEffect(() => {
        if (isSuccess) {
            setGlobal({
                successMessage: SUCCESS_SUBMIT_MESSAGE,
            });

            setTimeout(() => {
                setGlobal({ isLoading: false });
                router.push(path);
            }, 2000);
        }
    }, [path, isSuccess]);

    useEffect(() => {
        if (error) {
            if (
                error.response &&
                error.response.data &&
                (error.response.data.message || error.response.data.error)
            ) {
                let message;
                if (
                    containsKorean(
                        error.response.data.message || error.response.data.error
                    )
                ) {
                    message =
                        error.response.data.message ||
                        error.response.data.error;
                } else {
                    message = SERVER_500_ERROR_MESSAGE;
                }

                setGlobal({ errorMessage: message });
                setTimeout(() => {
                    setGlobal({ isLoading: false });
                }, 1000);
            }
        }
    }, [error]);
};
