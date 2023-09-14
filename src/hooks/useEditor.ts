import { useCallback } from 'react';

export const useUploadImage = () => {
    const onHandleAddImage = useCallback(
        async (blob: File | Blob, callback: Function) => {
            // blob: 이미지 Blob 객체
            // callback: 업로드 완료 후 이미지를 삽입하기 위한 콜백 함수

            // 서버에 이미지를 업로드하고, 이미지 URL을 가져옵니다.
            const formData = new FormData();
            formData.append('image', blob);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            const imageUrl = data.imageUrl; // 실제 개발에서는 서버에서 반환하는 이미지 URL을 사용합니다.

            callback(imageUrl, 'alt text'); // 두 번째 인수는 이미지의 alt 속성입니다.
        },
        []
    );

    return onHandleAddImage;
};
