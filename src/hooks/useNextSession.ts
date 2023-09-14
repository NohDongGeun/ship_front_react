import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { API_BASE_URL } from '../constants/pathConstants';

function isTokenExpired(token: string): boolean {
    try {
        const decodedToken: any = jwt.decode(token);

        if (!decodedToken || !decodedToken.exp) {
            return true;
        }

        const expirationDate = new Date(decodedToken.exp * 1000);

        if (expirationDate < new Date()) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return true;
    }
}

async function refreshAccessToken(
    accessToken: string,
    refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> {
    try {
        const response = await axios.put(
            `http://192.168.219.100/api/v1/auth`,
            undefined,
            {
                responseType: 'json',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'X-ERK': `${refreshToken}`,
                },
            }
        );
        if (response.status === 200) {
            return {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
            };
        } else {
            throw new Error('Failed to refresh access token');
        }
    } catch (error) {
        throw error;
    }
}

export function useNextSession() {
    const { data: session, update } = useSession();

    useEffect(() => {
        if (session && session?.user.accessToken) {
            const isExpired = isTokenExpired(session?.user.accessToken);

            if (isExpired) {
                refreshAccessToken(
                    session?.user.accessToken,
                    session?.user.xerk
                ).then((newToken) => {
                    if (newToken.accessToken) {
                        update({
                            accessToken: newToken.accessToken,
                            xerk: newToken.refreshToken,
                        });
                    }
                });
            }
        }
    }, [session]);

    return [session];
}
