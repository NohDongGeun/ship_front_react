import jwt from 'jsonwebtoken';

export const isTokenExpired = (token: string): boolean => {
    try {
        // 토큰을 디코딩합니다.
        const decoded: any = jwt.decode(token);

        // exp 프로퍼티가 없으면, 토큰이 만료되지 않았다고 가정합니다.
        if (!decoded.exp) {
            return false;
        }

        // 현재 시간을 UNIX 타임스탬프로 구합니다.
        const currentTime = Date.now() / 1000;

        // 만료 시간이 현재 시간보다 작다면, 토큰이 만료된 것입니다.
        if (decoded.exp < currentTime) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

export const getMeUUID = (token: string): string => {
    try {
        const decoded: any = jwt.decode(token);
        console.log(decoded);

        return decoded.userUUID;
    } catch (error) {
        return '';
    }
};
