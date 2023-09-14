import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

export const useLogin = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [identyKey, setIdentyKey] = useState('');

    const onChangePassword = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPassword(e.target.value);
        },
        []
    );

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setIdentyKey(e.target.value);
        },
        []
    );

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const callbackUrl = `${window.location.origin}${
            router.query.redirect && !router.query.redirect.includes('_next')
                ? router.query.redirect
                : '/'
        }`;

        const response = await signIn('Credentials', {
            identyKey,
            password,
            redirect: false,
            callbackUrl: callbackUrl,
        });

        if (response?.ok && response.status === 200) {
            const pathname = new URL(callbackUrl).pathname;
            window.location.href = pathname;
        } else {
            alert('잘못된 회원정보입니다. 다시 시도해주세요.');
            return;
        }
    };

    return {
        identyKey,
        password,
        onChangePassword,
        onChangeEmail,
        onSubmit,
    };
};
