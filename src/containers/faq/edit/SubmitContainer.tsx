import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateFaq } from '../../../api/faqs';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_FAQS } from '../../../constants/pathConstants';
import { useGetFaq } from '../../../hooks/useFaqs';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useEditFaqStore } from '../../../store/faq/faqEditStore';
import { IErrorResponse } from '../../../types/error';
import { IEditFaq } from '../../../types/faq';

interface ISubmitContainer {
    faqId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ faqId }) => {
    const session = useSession();
    const faq = useEditFaqStore((state) => state.faq);
    const oldbie = useGetFaq(faqId);
    const {
        isLoading,
        error,
        isSuccess,
        mutate,
    } = useMutation((data: { data: any; faqId: string; accessToken: string }) =>
        updateFaq(data.faqId, data.data, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_FAQS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken || !oldbie) return;

        if (!faq.title) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!faq.content) {
            alert('컨텐츠를 입력해주세요.');
            return;
        }

        if (!faq.serviceCategory) {
            alert('카테고리를 선택해주세요.');
            return;
        }

        const tempFaq: Partial<IEditFaq> = {};

        if (oldbie.title !== faq.title) {
            // 제목 변경
            tempFaq.title = faq.title;
        }

        if (oldbie.content !== faq.content) {
            // 컨텐츠 변경
            tempFaq.content = faq.content;
        }

        if (oldbie.serviceCategory.id !== faq.serviceCategory.id) {
            // 주소 변경
            tempFaq.serviceCategoryId = faq.serviceCategory.id;
        }

        if (oldbie.activate !== faq.activate) {
            //활성화 변경
            tempFaq.activate = faq.activate;
        }

        mutate({ faqId: `${faq.id}`, data: tempFaq, accessToken });
    }, [faq, oldbie]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
