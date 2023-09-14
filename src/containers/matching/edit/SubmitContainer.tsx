import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { getMatching, updateMatching } from '../../../api/matchings';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_MATCHINGS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useEditMatchingStore } from '../../../store/matching/matchingEditStore';
import { IErrorResponse } from '../../../types/error';
import { IMatching } from '../../../types/matching';
import { isEmptyObject } from '../../../utils/dataTransformUtils';

interface ISubmitContainer {
    matchingId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ matchingId }) => {
    const session = useSession();
    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: {
            matching: Partial<IMatching>;
            matchingId: string;
            accessToken: string;
        }) => updateMatching(data.matching, data.matchingId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_MATCHINGS,
        error as AxiosError<IErrorResponse>
    );

    const matching = useEditMatchingStore((state) => state.matching);

    const { data } = useQuery({
        queryKey: ['getMatching', matchingId],
        queryFn: () => getMatching(matchingId, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const onSubmit = useCallback(() => {
        if (!matching) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const oldbie = data.response;

        const tempMatching: Partial<IMatching> = {};

        if (oldbie.activate !== matching.activate) {
            // 상태 변경
            tempMatching.activate = matching.activate;
        }

        if (oldbie.matchingStatus !== matching.matchingStatus) {
            // 매칭 상태 변경
            tempMatching.matchingStatus = matching.matchingStatus;
        }

        if (isEmptyObject(tempMatching)) return;

        mutate({ matching: tempMatching, matchingId, accessToken });
    }, [matching, matchingId, session, data]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
