import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createFaq } from '../../../api/faqs';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_FAQS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddFaqStore } from '../../../store/faq/faqAddStore';
import { IErrorResponse } from '../../../types/error';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const faq = useAddFaqStore((state) => state.faq);

    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation((data: { data: any; accessToken: string }) =>
        createFaq(data.data, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_FAQS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        if (!faq.title) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!faq.content) {
            alert('컨텐츠를 입력해주세요.');
            return;
        }

        if (!faq.serviceCategory) {
            alert('서비스 카테고리를 선택해주세요.');
            return;
        }

        const tempFaqs = {
            title: faq.title,
            content: faq.content,
            activate: faq.activate,
            images: faq.images,
            serviceCategoryId: faq.serviceCategory.id,
        };

        mutate({ data: tempFaqs, accessToken });
    }, [faq]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
