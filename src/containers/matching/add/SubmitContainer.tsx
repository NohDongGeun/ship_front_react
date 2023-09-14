import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createMatching } from '../../../api/matchings';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_MATCHINGS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddMatchingStore } from '../../../store/matching/matchingAddStore';
import { IErrorResponse } from '../../../types/error';
import { ICreateMatching } from '../../../types/matching';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: { matching: ICreateMatching; accessToken: string }) =>
            createMatching(data.matching, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_MATCHINGS,
        error as AxiosError<IErrorResponse>
    );

    const matching = useAddMatchingStore((state) => state.matching);

    const onSubmit = useCallback(() => {
        if (!matching) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const validate = (user: ICreateMatching): boolean => {
            for (let key in user) {
                if (
                    user[key as keyof ICreateMatching] === '' ||
                    user[key as keyof ICreateMatching] === null ||
                    user[key as keyof ICreateMatching] === undefined
                ) {
                    return false;
                }
            }
            return true;
        };

        if (!validate(matching)) {
            alert('잘못된 입력입니다. 다시 입력해주세요.');
            return;
        }

        mutate({ matching, accessToken });
    }, [matching, session]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
