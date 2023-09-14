import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteFaq } from '../../../api/faqs';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_FAQS } from '../../../constants/pathConstants';
import { useGetFaq } from '../../../hooks/useFaqs';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    faqId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ faqId }) => {
    const session = useSession();
    const {
        isLoading,
        error,
        isSuccess,
        mutate,
    } = useMutation((data: { faqId: string; accessToken: string }) =>
        deleteFaq(data.faqId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_FAQS,
        error as AxiosError<IErrorResponse>
    );

    const oldbie = useGetFaq(faqId);

    const onSubmit = useCallback(() => {
        if (!oldbie) return;

        if (oldbie.activate) {
            alert('해당 FAQ는 활성화 되어 있습니다. 비활성화 후 삭제해주세요.');
            return;
        }
        const accessToken = session.data?.user.accessToken;

        mutate({ faqId, accessToken });
    }, [faqId, session, oldbie]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default React.memo(DeleteContainer);
